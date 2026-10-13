export declare class StudentProfileDto {
    university?: string;
    department?: string;
    course?: string;
    semester?: number;
    section?: string;
    group?: string;
    year?: number;
    batch?: string;
}
export declare class CreateStudentDto {
    uid: string;
    name: string;
    email: string;
    password?: string;
    forcePasswordChange?: boolean;
    isActive?: boolean;
    studentProfile?: StudentProfileDto;
}
