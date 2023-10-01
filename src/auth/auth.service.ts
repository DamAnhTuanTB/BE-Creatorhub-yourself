import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { CreateUserDto } from '../user/dto/index.dto';
import { comparePassword } from '../utils/bcrypt';
import {
  EmailExists,
  ErrorCreateNewPassword,
  ErrorForgetPassword,
  TokenExpired,
} from '../utils/message';
import { UserService } from './../user/user.service';
import { CreateNewPasswordDto, ForgetPasswordDto } from './dto/index.dto';

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
      throw new UnauthorizedException();
    }
  }
  async login(user: any) {
    const payload = { email: user.email, _id: user._id };
    return {
      token: this.jwtService.sign(payload),
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
      subject: 'Xác minh email từ hệ thống Creatorhub AI',
      template: './verify-user',
      context: {
        link: `${this.configService.get(
          'BASE_URL_CLIENT',
        )}/register/verify?token=${token}`,
      },
    });
    await this.userService.createUser(body);
    return {
      message: 'OK',
    };
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
          link: `${this.configService.get(
            'BASE_URL_CLIENT',
          )}/forget-password?token=${token}`,
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
}
