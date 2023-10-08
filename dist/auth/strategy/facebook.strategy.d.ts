import { ConfigService } from '@nestjs/config';
import { Profile, Strategy } from 'passport-facebook';
declare const FacebookStrategy_base: new (...args: any[]) => Strategy;
export declare class FacebookStrategy extends FacebookStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    authenticate(req: any, options?: object): void;
    validate(accessToken: string, refreshToken: string, profile: Profile, done: (err: any, user: any, info?: any) => void): Promise<any>;
}
export {};
