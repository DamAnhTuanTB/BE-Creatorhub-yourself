import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { formatedResponse, numberCreditUse } from '../utils';
import { encodePassword } from '../utils/bcrypt';
import { SuccessRegister } from '../utils/message';
import { CreateUserDto, QueryTypeUseDto } from './dto/index.dto';
import { UserDocument } from './model/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly UserModel: Model<UserDocument>,
  ) {}

  async getDetailUser(user: any) {
    delete user.password;
    delete user.isVerified;
    return {
      data: formatedResponse(user),
    };
  }

  async findUserByEmail(email: string) {
    return await this.UserModel.findOne({ email, isVerified: true }).lean();
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.UserModel.findOne({ email: createUserDto.email });
    const password = encodePassword(createUserDto.password);
    if (user) {
      await this.UserModel.updateOne(
        { email: createUserDto.email },
        {
          ...createUserDto,
          password,
        },
      );
    } else {
      await this.UserModel.create({ ...createUserDto, password });
    }
    return {
      statusCode: HttpStatus.CREATED,
      message: SuccessRegister,
    };
  }

  async verifyUser(email: string) {
    await this.UserModel.updateOne({ email }, { isVerified: true });
    return {
      message: 'OK',
    };
  }

  async updateNewPassword(email: string, password: string) {
    const newPassword = encodePassword(password);
    await this.UserModel.updateOne({ email }, { password: newPassword });
    return {
      message: 'OK',
    };
  }

  async updateUserWhenPaymentSuccess(userId: string, price: any) {
    const userCurrent: any = await this.UserModel.findById(userId).lean();
    const creditsCurrent = userCurrent.credits || 0;
    await this.UserModel.updateOne(
      { _id: userId },
      { credits: creditsCurrent + Number(price?.metadata?.credits) },
    );
    return {
      message: 'OK',
    };
  }

  async useCredits(userId: string, query: QueryTypeUseDto) {
    const userCurrent: any = await this.UserModel.findById(userId).lean();
    const creditsCurrent = userCurrent.credits;
    if (creditsCurrent < numberCreditUse[query.type]) {
      throw new HttpException(
        'Your credits is not enable.',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      await this.UserModel.updateOne(
        { _id: userId },
        { credits: creditsCurrent - numberCreditUse[query.type] },
      );
      return {
        message: 'OK',
      };
    }
  }
}
