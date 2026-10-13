import { User } from './user.entity';
export declare class University {
    id: string;
    mongoId: string;
    name: string;
    username: string;
    domain: string;
    logo: string;
    coverImage: string;
    location: string;
    website: string;
    description: string;
    contactEmail: string;
    tier: string;
    establishedYear: number;
    isVerified: boolean;
    createdBy: User;
    created_by_id: string;
    createdAt: Date;
    updatedAt: Date;
}
