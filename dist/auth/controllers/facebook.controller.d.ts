import { OAuth2Service } from '../services/oauth2.service';
import { Request, Response } from 'express';
export declare class FacebookController {
    private readonly oauth2Service;
    constructor(oauth2Service: OAuth2Service);
    facebookAuth(): Promise<void>;
    facebookAuthRedirect(req: Request, res: Response): Promise<any>;
}
