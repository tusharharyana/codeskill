import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CognitiveGameAttempt } from '../database/entities/cognitive-game-attempt.entity';
import { CognitiveGame } from '../database/entities/cognitive-game.entity';
import { CreateGameAttemptDto } from './dto/create-game-attempt.dto';
import { SaveCognitiveGameDto } from './dto/save-cognitive-game.dto';
import { scoreGameRound, validateGameRound } from './game-kind-registry';

@Injectable()
export class GamesService implements OnModuleInit {
  constructor(
    @InjectRepository(CognitiveGameAttempt)
    private readonly attempts: Repository<CognitiveGameAttempt>,
    @InjectRepository(CognitiveGame)
    private readonly games: Repository<CognitiveGame>,
  ) {}

  async onModuleInit() {
    const presets = [
      { slug: 'deductive', title: 'Deductive Challenge', shortDescription: 'Use clues to reach a logical conclusion.', description: 'Choose the conclusion supported by the facts.', color: 'violet', icon: '∴', durationSeconds: 180, rounds: [{kind:'choice',prompt:'All architects are problem solvers. What must be true?',choices:['All architects are musicians','All architects are problem solvers','No architects solve problems'],answer:1},{kind:'choice',prompt:'Mira finished before Dev. Dev before Lee. Who finished last?',choices:['Mira','Dev','Lee'],answer:2}], isPublished: true },
      { slug: 'switch', title: 'Switch Challenge', shortDescription: 'Change rules quickly and stay accurate.', description: 'Classify each prompt using its rule.', color: 'cyan', icon: '⇄', durationSeconds: 120, rounds: [{kind:'choice',instruction:'NUMBER RULE · Choose ODD or EVEN',prompt:'17',choices:['ODD','EVEN'],answer:0},{kind:'choice',instruction:'LETTER RULE · Choose VOWEL or CONSONANT',prompt:'M',choices:['VOWEL','CONSONANT'],answer:1}], isPublished: true },
      { slug: 'grid', title: 'Grid Challenge', shortDescription: 'Remember the order of a flashing tile sequence.', description: 'Watch the tiles light up, then reproduce their sequence.', color: 'emerald', icon: '▦', durationSeconds: 120, rounds: [{kind:'grid',prompt:'Repeat the highlighted tiles in order.',cells:[0,4,8]},{kind:'grid',prompt:'Repeat the highlighted tiles in order.',cells:[2,5,1,7]}], isPublished: true },
      { slug: 'inductive', title: 'Inductive Challenge', shortDescription: 'Spot a pattern and predict what comes next.', description: 'Find the rule behind each sequence.', color: 'amber', icon: '⌁', durationSeconds: 180, rounds: [{kind:'choice',prompt:'2, 4, 8, 16, ?',choices:['18','24','32','64'],answer:2},{kind:'choice',prompt:'3, 6, 11, 18, ?',choices:['25','27','29','36'],answer:1}], isPublished: true },
      { slug: 'motion', title: 'Motion Challenge', shortDescription: 'Track a moving marker across changing lanes.', description: 'Follow the marker as it jumps between lanes.', color: 'rose', icon: '➜', durationSeconds: 120, rounds: [{kind:'motion',prompt:'Track the marker. Which lane does it finish in?',path:[0,2,1,3,2]},{kind:'motion',prompt:'Follow the marker. Where does it stop?',path:[3,1,0,2,1,3]}], isPublished: true },
    ];
    for (const preset of presets) {
      if (!(await this.games.findOne({ where: { slug: preset.slug } }))) await this.games.save(this.games.create(preset));
    }
  }

  listPublished() { return this.games.find({ where: { isPublished: true, isDeleted: false }, order: { createdAt: 'ASC' } }); }
  async getPublished(slug: string) {
    const game = await this.games.findOne({ where: { slug, isPublished: true, isDeleted: false } });
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }
  listAdmin() { return this.games.find({ where: { isDeleted: false }, order: { updatedAt: 'DESC' } }); }
  async createGame(dto: SaveCognitiveGameDto) { this.validateRounds(dto.rounds); return this.games.save(this.games.create(dto)); }
  async updateGame(id: string, dto: Partial<SaveCognitiveGameDto>) {
    const game = await this.games.findOne({ where: { id, isDeleted: false } });
    if (!game) throw new NotFoundException('Game not found');
    if (dto.rounds) this.validateRounds(dto.rounds);
    Object.assign(game, dto);
    return this.games.save(game);
  }
  async deleteGame(id: string) {
    const game = await this.games.findOne({ where: { id, isDeleted: false } });
    if (!game) throw new NotFoundException('Game not found');
    game.isDeleted = true;
    game.isPublished = false;
    await this.games.save(game);
    return { success: true, message: 'Game archived; student history retained.' };
  }
  async listAdminAttempts(gameId?: string, studentId?: string) {
    const query = this.attempts.createQueryBuilder('attempt')
      .leftJoin('attempt.user', 'student')
      .select(['attempt.id', 'attempt.gameId', 'attempt.score', 'attempt.totalRounds', 'attempt.correctRounds', 'attempt.durationSeconds', 'attempt.responses', 'attempt.createdAt', 'attempt.userId'])
      .addSelect(['student.name', 'student.email', 'student.uid'])
      .orderBy('attempt.createdAt', 'DESC').take(500);
    if (gameId) query.andWhere('attempt.gameId = :gameId', { gameId });
    if (studentId) query.andWhere('attempt.userId = :studentId', { studentId });
    return query.getMany();
  }

  private validateRounds(rounds: Record<string, unknown>[]) {
    if (!Array.isArray(rounds) || rounds.length < 1 || rounds.length > 20) throw new BadRequestException('Provide between 1 and 20 rounds.');
    for (const round of rounds) {
      const error = validateGameRound(round);
      if (error) throw new BadRequestException(error);
    }
  }

  async createAttempt(dto: CreateGameAttemptDto, user: any) {
    if (!dto.responses && dto.correctRounds > dto.totalRounds) {
      throw new BadRequestException('Correct rounds cannot exceed total rounds.');
    }
    const game = await this.games.findOne({ where: { slug: dto.gameId, isPublished: true, isDeleted: false } });
    if (!game) throw new BadRequestException('This game is not available.');
    let correctRounds = dto.correctRounds;
    let score = dto.score;
    if (dto.responses) {
      if (dto.totalRounds !== game.rounds.length || dto.responses.length > game.rounds.length) throw new BadRequestException('Attempt round counts do not match this game.');
      correctRounds = dto.responses.reduce<number>((total, response, index) => total + scoreGameRound(game.rounds[index], response), 0);
      score = Math.round((correctRounds / game.rounds.length) * 100);
    }
    const attempt = this.attempts.create({
      ...dto,
      correctRounds,
      score,
      responses: dto.responses || [],
      userId: String(user.id || user._id),
    });
    return this.attempts.save(attempt);
  }

  async getMyAttempts(user: any) {
    const attempts = await this.attempts.find({
      where: { userId: String(user.id || user._id) },
      order: { createdAt: 'DESC' },
      take: 100,
    });
    const bestScores = attempts.reduce<Record<string, number>>((best, attempt) => {
      best[attempt.gameId] = Math.max(best[attempt.gameId] || 0, attempt.score);
      return best;
    }, {});
    return { attempts, bestScores };
  }
}
