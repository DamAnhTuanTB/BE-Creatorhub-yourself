import { ConfigService } from '@nestjs/config';
export declare class S3Service {
    private configService;
    s3: any;
    constructor(configService: ConfigService);
    s3GeneratePresignLinkToUpload(path: string): Promise<unknown>;
    createPresignedPostPromise: (params: any) => Promise<unknown>;
    generateFormDataUpload: (path: string) => Promise<unknown>;
}
