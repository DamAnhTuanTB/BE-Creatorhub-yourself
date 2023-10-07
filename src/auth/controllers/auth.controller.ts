import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto/index.dto';
import { UserService } from '../../user/user.service';
import { User } from '../../utils/user.decorator';
import { AuthService } from '../services/auth.service';
import {
  CreateNewPasswordDto,
  ForgetPasswordDto,
  GenerateNewTokenDto,
  LoginUserDto,
} from '../dto/index.dto';
import { LocalAuthGuard } from '../guard/local-auth.guard';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: CreateUserDto, @Body() loginUser: LoginUserDto) {
    return this.authService.login(user);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Get('verify/:token')
  @HttpCode(HttpStatus.OK)
  async verifyUser(@Param('token') token: string) {
    return this.authService.verifyUser(token);
  }

  @Post('create-new-password')
  @HttpCode(HttpStatus.OK)
  async createNewPassword(@Body() body: CreateNewPasswordDto) {
    return this.authService.createNewPassword(body);
  }

  @Post('forget-password')
  @HttpCode(HttpStatus.OK)
  async forgetPassword(@Body() body: ForgetPasswordDto) {
    return this.authService.forgetPassword(body);
  }

  @Post('generate-new-token')
  @HttpCode(HttpStatus.CREATED)
  async generateNewToken(@Body() body: GenerateNewTokenDto) {
    return this.authService.generateNewToken(body);
  }
}
