import { ContestsService } from './contests.service';
export declare class ContestsController {
    private readonly contestsService;
    constructor(contestsService: ContestsService);
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
    register(id: string, userId: string, password?: string): Promise<{
        success: boolean;
    }>;
}
