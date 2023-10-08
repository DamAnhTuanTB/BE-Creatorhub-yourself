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
import { HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { GoogleUser } from '../utils';
import { CreateUserDto, QueryTypeUseDto } from './dto/index.dto';
import { UserDocument } from './model/user.model';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private readonly UserModel;
    private readonly jwtService;
    constructor(UserModel: Model<UserDocument>, jwtService: JwtService);
    getDetailUser(user: any): Promise<{
        data: any;
    }>;
    findUserByEmail(email: string): Promise<import("mongoose").FlattenMaps<UserDocument> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findUserByEmailNotActive(email: string): Promise<import("mongoose").Document<unknown, {}, UserDocument> & import("./model/user.model").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createUser(createUserDto: CreateUserDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    verifyUser(email: string): Promise<{
        message: string;
    }>;
    updateNewPassword(email: string, password: string): Promise<{
        message: string;
    }>;
    updateUserWhenPaymentSuccess(userId: string, price: any): Promise<{
        message: string;
    }>;
    useCredits(userId: string, query: QueryTypeUseDto): Promise<{
        message: string;
    }>;
    loginWithOauth2(user: GoogleUser): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
