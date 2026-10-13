export declare class S3Service {
    private s3Client;
    private readonly logger;
    private bucketName;
    constructor();
    uploadFile(file: Express.Multer.File, folder?: string): Promise<string>;
    deleteFile(fileUrl: string): Promise<void>;
}
