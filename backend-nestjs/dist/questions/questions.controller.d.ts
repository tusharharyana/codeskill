import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QueryQuestionsDto } from './dto/query-questions.dto';
import { CreateQuestionBankDto } from './dto/create-question-bank.dto';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    findAll(query: QueryQuestionsDto): Promise<{
        questions: import("../database/entities/question.entity").Question[];
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
    importPreview(file: Express.Multer.File): Promise<{
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
    autoImport(file: Express.Multer.File, adminUser: any, req: any): Promise<{
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
    confirmImport(validRows: any[], adminUser: any, req: any): Promise<{
        success: boolean;
        message: string;
        count: number;
        insertedCount: number;
        updatedCount: number;
    }>;
    getTopics(): Promise<{
        success: boolean;
        topics: any;
        data: any;
    }>;
    findById(id: string): Promise<any>;
    create(dto: CreateQuestionDto, adminUser: any, req: any): Promise<import("../database/entities/question.entity").Question>;
    update(id: string, dto: UpdateQuestionDto, adminUser: any, req: any): Promise<import("../database/entities/question.entity").Question>;
    delete(id: string, adminUser: any, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    approve(id: string, adminUser: any, req: any): Promise<import("../database/entities/question.entity").Question>;
    reject(id: string, reason: string, adminUser: any, req: any): Promise<import("../database/entities/question.entity").Question>;
}
export declare class QuestionBanksController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    findAll(topic?: string): Promise<{
        success: boolean;
        banks: import("../database/entities/question-bank.entity").QuestionBank[];
        data: import("../database/entities/question-bank.entity").QuestionBank[];
    }>;
    findById(id: string): Promise<import("../database/entities/question-bank.entity").QuestionBank>;
    create(dto: CreateQuestionBankDto, adminUser: any): Promise<import("../database/entities/question-bank.entity").QuestionBank>;
    update(id: string, dto: Partial<CreateQuestionBankDto>): Promise<import("../database/entities/question-bank.entity").QuestionBank>;
    delete(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
