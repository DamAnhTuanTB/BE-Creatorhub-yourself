import { HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/index.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './model/user.model';
import { encodePassword } from 'src/utils/bcrypt';
import { EmailExists, SuccessRegister } from 'src/utils/message';
import { formatedResponse } from 'src/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly UserModel: Model<UserDocument>,
  ) {}

  async getDetailUser(user: CreateUserDto) {
    delete user.password;
    return {
      data: formatedResponse(user),
    };
  }

  async findUserByEmail(email: string) {
    return await this.UserModel.findOne({ email }).lean();
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.findUserByEmail(createUserDto.email);
    if (user) {
      throw new HttpException(EmailExists, HttpStatus.BAD_REQUEST);
    }
    const password = encodePassword(createUserDto.password);
    await this.UserModel.create({ ...createUserDto, password });
    return {
      statusCode: HttpStatus.CREATED,
      message: SuccessRegister,
    };
  }
}
