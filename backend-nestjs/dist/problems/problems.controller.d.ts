import { ProblemsService } from './problems.service';
export declare class ProblemsController {
    private readonly problemsService;
    constructor(problemsService: ProblemsService);
    getProblems(query: any): Promise<any>;
    getProblemBySlug(slug: string): Promise<any>;
}
