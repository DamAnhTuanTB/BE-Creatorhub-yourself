/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { S3Service } from './../s3/s3.service';
import { ConfigService } from '@nestjs/config';
import { QueryDeleteStoreDto, QueryGetListStoreDto } from './dto/index.dto';
import { StoreDocument } from './model/store.model';
export declare class StoreService {
    private readonly StoreModel;
    private readonly s3Service;
    private readonly configService;
    constructor(StoreModel: Model<StoreDocument>, s3Service: S3Service, configService: ConfigService);
    saveImage(file: any, body: any): Promise<import("mongoose").Document<unknown, {}, StoreDocument> & import("./model/store.model").Store & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getListImage(userId: string, query: QueryGetListStoreDto): Promise<{
        page: number;
        limit: number;
        total: number;
        data: any[];
    }>;
    deleteImages(query: QueryDeleteStoreDto): Promise<{
        message: string;
    }>;
}
