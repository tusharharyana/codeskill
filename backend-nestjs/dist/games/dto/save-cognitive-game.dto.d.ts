export declare class SaveCognitiveGameDto {
    slug: string;
    title: string;
    shortDescription?: string;
    description?: string;
    color?: string;
    icon?: string;
    durationSeconds: number;
    rounds: Record<string, unknown>[];
    isPublished?: boolean;
}
