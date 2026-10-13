import { Repository } from 'typeorm';
import { Question as QuestionEntity } from '../database/entities/question.entity';
import { Problem as ProblemEntity } from '../database/entities/problem.entity';
import { QuestionBank as QuestionBankEntity } from '../database/entities/question-bank.entity';
import { AuditLog as AuditLogEntity } from '../database/entities/audit-log.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QueryQuestionsDto } from './dto/query-questions.dto';
import { CreateQuestionBankDto } from './dto/create-question-bank.dto';
export declare class QuestionsService {
    private readonly questionRepository;
    private readonly questionBankRepository;
    private readonly problemRepository;
    private readonly auditLogRepository;
    constructor(questionRepository: Repository<QuestionEntity>, questionBankRepository: Repository<QuestionBankEntity>, problemRepository: Repository<ProblemEntity>, auditLogRepository: Repository<AuditLogEntity>);
    private normalizeCategories;
    private createPublishedProblem;
    findAll(query: QueryQuestionsDto): Promise<{
        questions: QuestionEntity[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
        stats: {
            total: number;
            pending: number;
            approved: number;
        };
    }>;
    findById(id: string, isStudent?: boolean): Promise<any>;
    create(dto: CreateQuestionDto, adminUser: any, ip?: string, userAgent?: string): Promise<QuestionEntity>;
    update(id: string, dto: UpdateQuestionDto, adminUser: any, ip?: string, userAgent?: string): Promise<QuestionEntity>;
    delete(id: string, adminUser: any, ip?: string, userAgent?: string): Promise<{
        success: boolean;
        message: string;
    }>;
    review(id: string, status: 'approved' | 'rejected', reason: string | undefined, adminUser: any, ip?: string, userAgent?: string): Promise<QuestionEntity>;
    getTopicsDistribution(): Promise<any>;
    findAllBanks(topic?: string): Promise<QuestionBankEntity[]>;
    findBankById(id: string): Promise<QuestionBankEntity>;
    createBank(dto: CreateQuestionBankDto, adminUser: any): Promise<QuestionBankEntity>;
    updateBank(id: string, dto: Partial<CreateQuestionBankDto>): Promise<QuestionBankEntity>;
    deleteBank(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    parseAndValidateQuestionsImport(fileBuffer: Buffer): Promise<{
        summary: {
            totalRows: number;
            validCount: number;
            invalidCount: number;
            duplicateCount: number;
            toInsertCount: number;
            toUpdateCount: number;
        };
        validRows: any[];
        errors: {
            row: number;
            question?: string;
            error: string;
        }[];
    }>;
    confirmQuestionsImport(validRows: any[], adminUser: any, ip?: string, userAgent?: string): Promise<{
        success: boolean;
        message: string;
        count: number;
        insertedCount: number;
        updatedCount: number;
    }>;
    autoImportQuestions(fileBuffer: Buffer, adminUser: any, ip?: string, userAgent?: string): Promise<{
        success: boolean;
        message: string;
        summary: {
            insertedCount: number;
            updatedCount: number;
            totalRows: number;
            validCount: number;
            invalidCount: number;
            duplicateCount: number;
            toInsertCount: number;
            toUpdateCount: number;
        };
        validCount: number;
        invalidCount: number;
        errors: {
            row: number;
            question?: string;
            error: string;
        }[];
    }>;
}
