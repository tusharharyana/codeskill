"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var S3Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const uuid_1 = require("uuid");
const path = __importStar(require("path"));
let S3Service = S3Service_1 = class S3Service {
    s3Client;
    logger = new common_1.Logger(S3Service_1.name);
    bucketName;
    constructor() {
        const region = process.env.AWS_REGION || 'us-east-1';
        this.bucketName = process.env.AWS_S3_BUCKET_NAME || '';
        if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
            this.s3Client = new client_s3_1.S3Client({
                region,
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                },
            });
        }
        else {
            this.s3Client = new client_s3_1.S3Client({ region });
        }
    }
    async uploadFile(file, folder = 'avatars') {
        if (!this.bucketName) {
            this.logger.error('AWS_S3_BUCKET_NAME is not configured in .env');
            throw new common_1.InternalServerErrorException('S3 Bucket is not configured');
        }
        try {
            const ext = path.extname(file.originalname);
            const filename = `${folder}/${(0, uuid_1.v4)()}${ext}`;
            const command = new client_s3_1.PutObjectCommand({
                Bucket: this.bucketName,
                Key: filename,
                Body: file.buffer,
                ContentType: file.mimetype,
            });
            await this.s3Client.send(command);
            return `https://${this.bucketName}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${filename}`;
        }
        catch (error) {
            this.logger.error('Error uploading file to S3', error);
            throw new common_1.InternalServerErrorException('Failed to upload file to S3');
        }
    }
    async deleteFile(fileUrl) {
        if (!this.bucketName) {
            return;
        }
        try {
            const url = new URL(fileUrl);
            const key = url.pathname.substring(1);
            if (!key)
                return;
            const command = new client_s3_1.DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: key,
            });
            await this.s3Client.send(command);
            this.logger.log(`Successfully deleted old file from S3: ${key}`);
        }
        catch (error) {
            this.logger.error(`Error deleting file from S3: ${fileUrl}`, error);
        }
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = S3Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], S3Service);
//# sourceMappingURL=s3.service.js.map