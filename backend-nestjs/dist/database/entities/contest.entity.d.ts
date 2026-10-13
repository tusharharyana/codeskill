export declare class Contest {
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
}
