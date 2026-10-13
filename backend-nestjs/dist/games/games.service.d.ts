import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CognitiveGameAttempt } from '../database/entities/cognitive-game-attempt.entity';
import { CognitiveGame } from '../database/entities/cognitive-game.entity';
import { CreateGameAttemptDto } from './dto/create-game-attempt.dto';
import { SaveCognitiveGameDto } from './dto/save-cognitive-game.dto';
export declare class GamesService implements OnModuleInit {
    private readonly attempts;
    private readonly games;
    constructor(attempts: Repository<CognitiveGameAttempt>, games: Repository<CognitiveGame>);
    onModuleInit(): Promise<void>;
    listPublished(): Promise<CognitiveGame[]>;
    getPublished(slug: string): Promise<CognitiveGame>;
    listAdmin(): Promise<CognitiveGame[]>;
    createGame(dto: SaveCognitiveGameDto): Promise<CognitiveGame>;
    updateGame(id: string, dto: Partial<SaveCognitiveGameDto>): Promise<CognitiveGame>;
    deleteGame(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    listAdminAttempts(gameId?: string, studentId?: string): Promise<CognitiveGameAttempt[]>;
    private validateRounds;
    createAttempt(dto: CreateGameAttemptDto, user: any): Promise<CognitiveGameAttempt>;
    getMyAttempts(user: any): Promise<{
        attempts: CognitiveGameAttempt[];
        bestScores: Record<string, number>;
    }>;
}
