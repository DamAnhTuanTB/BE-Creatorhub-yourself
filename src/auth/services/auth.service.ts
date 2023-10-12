import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../../mail/mail.service';
import { CreateUserDto } from '../../user/dto/index.dto';
import { UserService } from '../../user/user.service';
import { comparePassword } from '../../utils/bcrypt';
import {
  EmailExists,
  ErrorCreateNewPassword,
  ErrorForgetPassword,
  ErrorGetAgainVerifyUser,
  TokenExpired,
} from '../../utils/message';
import {
  CreateNewPasswordDto,
  ForgetPasswordDto,
  GenerateNewTokenDto,
  GetAgainVerifyUser,
} from '../dto/index.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const userDB = await this.userService.findUserByEmail(email);
    if (userDB) {
      const matched = comparePassword(password, userDB.password);
      if (matched) {
        return userDB;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  async login(user: any) {
    const payload = { email: user.email, _id: user._id };
    return {
      token: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async createUser(body: CreateUserDto) {
    const user = await this.userService.findUserByEmail(body.email);
    if (user) {
      throw new HttpException(EmailExists, HttpStatus.BAD_REQUEST);
    }
    const token = this.jwtService.sign({ email: body.email });
    this.mailService.sendMail({
      to: body.email,
      subject: 'Xác minh email đăng ký tài khoản từ hệ thống Creatorhub AI',
      template: './verify-user',
      context: {
        link: `${body.redirectUrl}?token=${token}&email=${body.email}`,
      },
    });
    await this.userService.createUser(body);
    return {
      message: 'OK',
    };
  }

  async getAgainVerifyUser(query: GetAgainVerifyUser) {
    const user = await this.userService.findUserByEmailNotActive(query.email);
    if (user) {
      const token = this.jwtService.sign({ email: query.email });
      this.mailService.sendMail({
        to: query.email,
        subject: 'Xác minh email đăng ký tài khoản từ hệ thống Creatorhub AI',
        template: './verify-user',
        context: {
          link: `${query.redirectUrl}?token=${token}&email=${query.email}`,
        },
      });
      return {
        message: 'OK',
      };
    } else {
      throw new HttpException(ErrorGetAgainVerifyUser, HttpStatus.BAD_REQUEST);
    }
  }

  async verifyUser(token: string) {
    try {
      const user = this.jwtService.verify(token);
      return this.userService.verifyUser(user.email);
    } catch {
      throw new HttpException(TokenExpired, HttpStatus.BAD_REQUEST);
    }
  }

  async forgetPassword(body: ForgetPasswordDto) {
    const userDB = await this.userService.findUserByEmail(body.email);
    if (userDB) {
      const token = this.jwtService.sign({ email: body.email });
      this.mailService.sendMail({
        to: body.email,
        subject: 'Đổi mật khẩu từ tài khoản Creatorhub AI',
        template: './forget-password',
        context: {
          link: `${body.redirectUrl}?token=${token}&email=${body.email}`,
        },
      });
      return {
        message: 'OK',
      };
    } else {
      throw new HttpException(ErrorForgetPassword, HttpStatus.BAD_REQUEST);
    }
  }

  async createNewPassword(body: CreateNewPasswordDto) {
    try {
      const user = this.jwtService.verify(body.token);
      return this.userService.updateNewPassword(user.email, body.password);
      // return this.userService.verifyUser(user.email);
    } catch {
      throw new HttpException(ErrorCreateNewPassword, HttpStatus.BAD_REQUEST);
    }
  }

  async generateNewToken(body: GenerateNewTokenDto) {
    try {
      const payload = this.jwtService.verify(body.refreshToken);
      const token = this.jwtService.sign({
        email: payload.email,
        _id: payload._id,
      });
      const refreshToken = this.jwtService.sign(
        { email: payload.email, _id: payload._id },
        { expiresIn: '7d' },
      );
      return {
        token,
        refreshToken,
      };
    } catch (error: any) {
      throw new UnauthorizedException();
    }
  }
}
