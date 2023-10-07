import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from '../mail/mail.module';
import { UserModule } from './../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { ConfigModule } from '@nestjs/config';
import { OAuth2Service } from './services/oauth2.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { GoogleController } from './controllers/google.controller';
import { FacebookStrategy } from './strategy/facebook.strategy';
import { FacebookController } from './controllers/facebook.controller';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
    MailModule,
    ConfigModule,
  ],
  controllers: [AuthController, GoogleController, FacebookController],
  providers: [
    AuthService,
    OAuth2Service,
    JwtStrategy,
    LocalStrategy,
    GoogleStrategy,
    FacebookStrategy,
  ],
})
export class AuthModule {}
