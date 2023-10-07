import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('FACEBOOK_OAUTH.FACEBOOK_APP_ID'),
      clientSecret: configService.get('FACEBOOK_OAUTH.FACEBOOK_APP_SECRET'),
      callbackURL: configService.get('FACEBOOK_OAUTH.CALLBACK_URL'),
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  authenticate(req: any, options?: object): void {
    const stringify = JSON.stringify(req.query);
    super.authenticate(req, {
      ...options,
      state: stringify,
    });
  }

  //   authenticate(req: Request, options: any) {
  //     const stringify = JSON.stringify(req.query); // Lấy query được truyền từ client, sau đó gắn vào state của trong query của request ví dụ: localhost:9090/google?redirect_url=http://localhost:3000
  //     super.authenticate(req, {
  //       ...options,
  //       state: stringify, // bắt buộc phải gán vào key có tên là state, nếu tự đặt tên key khác thì sẽ không ăn được giá trị
  //     });
  //   }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    };
    const payload = {
      user,
      accessToken,
    };

    done(null, payload);
  }
}
