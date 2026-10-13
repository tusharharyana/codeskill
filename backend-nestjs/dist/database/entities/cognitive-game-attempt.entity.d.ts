import { User } from './user.entity';
export declare class CognitiveGameAttempt {
    id: string;
    user: User;
    userId: string;
    gameId: string;
    score: number;
    totalRounds: number;
    correctRounds: number;
    durationSeconds: number;
    responses: unknown[];
    createdAt: Date;
}
