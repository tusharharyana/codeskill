export declare const appConfig: (() => {
    port: number;
    nodeEnv: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    port: number;
    nodeEnv: string;
}>;
export declare const databaseConfig: (() => {
    postgres: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        ssl: boolean;
        url: string | undefined;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    postgres: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        ssl: boolean;
        url: string | undefined;
    };
}>;
export declare const redisConfig: (() => {
    host: string;
    port: number;
    password: string;
    url: string | undefined;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    host: string;
    port: number;
    password: string;
    url: string | undefined;
}>;
export declare const jwtConfig: (() => {
    secret: string;
    expiresIn: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    secret: string;
    expiresIn: string;
}>;
export declare const awsConfig: (() => {
    accessKeyId: string | undefined;
    secretAccessKey: string | undefined;
    sessionToken: string | undefined;
    region: string;
    sesSender: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    accessKeyId: string | undefined;
    secretAccessKey: string | undefined;
    sessionToken: string | undefined;
    region: string;
    sesSender: string;
}>;
export declare const oauthConfig: (() => {
    googleClientId: string | undefined;
    googleClientSecret: string | undefined;
    githubClientId: string | undefined;
    githubClientSecret: string | undefined;
    linkedinClientId: string | undefined;
    linkedinClientSecret: string | undefined;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    googleClientId: string | undefined;
    googleClientSecret: string | undefined;
    githubClientId: string | undefined;
    githubClientSecret: string | undefined;
    linkedinClientId: string | undefined;
    linkedinClientSecret: string | undefined;
}>;
export declare const adminConfig: (() => {
    emails: string;
    password: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    emails: string;
    password: string;
}>;
