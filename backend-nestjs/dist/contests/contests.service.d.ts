import { Repository } from 'typeorm';
import { Contest } from '../database/entities/contest.entity';
import { ContestAttempt } from '../database/entities/contest-attempt.entity';
export declare class ContestsService {
    private readonly contestRepo;
    private readonly attemptRepo;
    constructor(contestRepo: Repository<Contest>, attemptRepo: Repository<ContestAttempt>);
    getContests(): Promise<{
        _id: string;
        id: string;
        mongoId: string;
        title: string;
        slug: string;
        description: string;
        startTime: Date;
        endTime: Date;
        problems: string[];
        isPrivate: boolean;
        password?: string;
        antiCheatConfig: any;
        isPublished: boolean;
        participants: string[];
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getContest(slug: string): Promise<{
        _id: string;
        id: string;
        mongoId: string;
        title: string;
        slug: string;
        description: string;
        startTime: Date;
        endTime: Date;
        problems: string[];
        isPrivate: boolean;
        password?: string;
        antiCheatConfig: any;
        isPublished: boolean;
        participants: string[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    register(contestId: string, userId: string, password?: string): Promise<{
        success: boolean;
    }>;
}
