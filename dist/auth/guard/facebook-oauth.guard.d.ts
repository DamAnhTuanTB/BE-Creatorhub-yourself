import { ConfigService } from '@nestjs/config';
declare const FacebookOAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class FacebookOAuthGuard extends FacebookOAuthGuard_base {
    private configService;
    constructor(configService: ConfigService);
}
export {};
