import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
declare const GoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    authenticate(req: Request, options: any): Promise<void>;
    validate(req: Request, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
}
export {};
