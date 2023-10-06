import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class GoogleService {
  constructor(private readonly userService: UserService) {}
  async googleLogin(req: any, res: any) {
    const queryFromClient: any = JSON.parse(req.query.state);
    const { redirect_url } = queryFromClient;
    if (!req.user) {
      return res.redirect(redirect_url + '?error_message=No_has_user');
    }

    if (!redirect_url) {
      return res.status(400).json({ error: 'Missing redirect url!' });
    }

    const token: any = await this.userService.oauth2WithGoogle(req.user);
    res.redirect(redirect_url + '?token=' + token.accessToken);
  }
}
