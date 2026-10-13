import { Repository } from 'typeorm';
import { Problem as ProblemEntity } from '../database/entities/problem.entity';
import { CacheService } from '../redis/cache.service';
export declare class ProblemsService {
    private problemRepository;
    private cacheService;
    constructor(problemRepository: Repository<ProblemEntity>, cacheService: CacheService);
    getProblems(query: any): Promise<any>;
    getProblemBySlug(slug: string): Promise<any>;
}
