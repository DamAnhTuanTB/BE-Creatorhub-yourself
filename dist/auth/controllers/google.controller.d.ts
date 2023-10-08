import { OAuth2Service } from '../services/oauth2.service';
import { Request, Response } from 'express';
export declare class GoogleController {
    private readonly oauth2Service;
    constructor(oauth2Service: OAuth2Service);
    googleAuth(): Promise<void>;
    googleAuthRedirect(req: Request, res: Response): Promise<any>;
}
