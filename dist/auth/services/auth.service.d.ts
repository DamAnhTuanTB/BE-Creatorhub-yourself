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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../../mail/mail.service';
import { CreateUserDto } from '../../user/dto/index.dto';
import { UserService } from '../../user/user.service';
import { CreateNewPasswordDto, ForgetPasswordDto, GenerateNewTokenDto, GetAgainVerifyUser } from '../dto/index.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly mailService;
    private readonly configService;
    constructor(userService: UserService, jwtService: JwtService, mailService: MailService, configService: ConfigService);
    validateUser(email: string, password: string): Promise<import("mongoose").FlattenMaps<import("../../user/model/user.model").UserDocument> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    login(user: any): Promise<{
        token: string;
        refreshToken: string;
    }>;
    createUser(body: CreateUserDto): Promise<{
        message: string;
    }>;
    getAgainVerifyUser(query: GetAgainVerifyUser): Promise<{
        message: string;
    }>;
    verifyUser(token: string): Promise<{
        message: string;
    }>;
    forgetPassword(body: ForgetPasswordDto): Promise<{
        message: string;
    }>;
    createNewPassword(body: CreateNewPasswordDto): Promise<{
        message: string;
    }>;
    generateNewToken(body: GenerateNewTokenDto): Promise<{
        token: string;
        refreshToken: string;
    }>;
}
