import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Injectable()
export class OAuth2Service {
  constructor(private readonly userService: UserService) {}
  async googleLogin(req: any, res: any) {
    const queryFromClient: any = JSON.parse(req.query.state);
    const { redirect_url } = queryFromClient;
    if (!req.user) {
      // return res.redirect(redirect_url + '?error_message=No_has_user');
      return res.status(400).json({ error: 'No user from google' });
    }

    if (!redirect_url) {
      return res.status(400).json({ error: 'Missing redirect url!' });
    }

    const token: any = await this.userService.loginWithOauth2(req.user);
    res.redirect(
      redirect_url +
        '?token=' +
        token.accessToken +
        '&refresh_token=' +
        token.refreshToken,
    );
  }

  async facebookLogin(req: any, res: any) {
    const queryFromClient: any = JSON.parse(req.query.state);
    const { redirect_url } = queryFromClient;
    if (!req.user?.user) {
      // return res.redirect(redirect_url + '?error_message=No_has_user');
      return res.status(400).json({ error: 'No user from facebook' });
    }

    if (!redirect_url) {
      return res.status(400).json({ error: 'Missing redirect url!' });
    }

    const token: any = await this.userService.loginWithOauth2(req.user?.user);
    res.redirect(
      redirect_url +
        '?token=' +
        token.accessToken +
        '&refresh_token=' +
        token.refreshToken,
    );
  }
}
