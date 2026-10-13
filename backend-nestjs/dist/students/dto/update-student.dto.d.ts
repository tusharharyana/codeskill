import { StudentProfileDto } from './create-student.dto';
export declare class UpdateStudentDto {
    uid?: string;
    name?: string;
    email?: string;
    isActive?: boolean;
    forcePasswordChange?: boolean;
    studentProfile?: StudentProfileDto;
}
