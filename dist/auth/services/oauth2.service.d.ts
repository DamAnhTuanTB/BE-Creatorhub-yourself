import { UserService } from '../../user/user.service';
export declare class OAuth2Service {
    private readonly userService;
    constructor(userService: UserService);
    googleLogin(req: any, res: any): Promise<any>;
    facebookLogin(req: any, res: any): Promise<any>;
}
