import { SaveCognitiveGameDto } from './dto/save-cognitive-game.dto';
import { GamesService } from './games.service';
export declare class GamesAdminController {
    private readonly games;
    constructor(games: GamesService);
    list(): Promise<import("../database/entities/cognitive-game.entity").CognitiveGame[]>;
    attempts(gameId?: string, studentId?: string): Promise<import("../database/entities/cognitive-game-attempt.entity").CognitiveGameAttempt[]>;
    create(dto: SaveCognitiveGameDto): Promise<import("../database/entities/cognitive-game.entity").CognitiveGame>;
    update(id: string, dto: Partial<SaveCognitiveGameDto>): Promise<import("../database/entities/cognitive-game.entity").CognitiveGame>;
    delete(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
