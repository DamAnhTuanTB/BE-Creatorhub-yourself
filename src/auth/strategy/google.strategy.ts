import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('GOOGLE_OAUTH.GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_OAUTH.GOOGLE_SECRET'),
      callbackURL: configService.get('GOOGLE_OAUTH.CALLBACK_URL'),
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  async authenticate(req: Request, options: any) {
    const stringify = JSON.stringify(req.query); // Lấy query được truyền từ client, sau đó gắn vào state của trong query của request ví dụ: localhost:9090/google?redirect_url=http://localhost:3000
    super.authenticate(req, {
      ...options,
      state: stringify, // bắt buộc phải gán vào key có tên là state, nếu tự đặt tên key khác thì sẽ không ăn được giá trị
    });
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    // return user;
    done(null, user);
  }
}
