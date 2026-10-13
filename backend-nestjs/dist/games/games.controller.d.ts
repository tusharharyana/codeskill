import { CreateGameAttemptDto } from './dto/create-game-attempt.dto';
import { GamesService } from './games.service';
export declare class GamesController {
    private readonly games;
    constructor(games: GamesService);
    listPublished(): Promise<import("../database/entities/cognitive-game.entity").CognitiveGame[]>;
    getPublished(slug: string): Promise<import("../database/entities/cognitive-game.entity").CognitiveGame>;
    getMyAttempts(user: any): Promise<{
        attempts: import("../database/entities/cognitive-game-attempt.entity").CognitiveGameAttempt[];
        bestScores: Record<string, number>;
    }>;
    createAttempt(dto: CreateGameAttemptDto, user: any): Promise<import("../database/entities/cognitive-game-attempt.entity").CognitiveGameAttempt>;
}
