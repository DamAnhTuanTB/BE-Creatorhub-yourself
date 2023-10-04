import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { User } from '../utils/user.decorator';
import { QueryTypeUseDto } from './dto/index.dto';
import { UserService } from './user.service';

@ApiTags('User')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getProfile(@User() user: any) {
    return this.userService.getDetailUser(user);
  }

  @Get('use-credits')
  @HttpCode(HttpStatus.OK)
  useCredits(@Query() query: QueryTypeUseDto, @User('_id') userId: string) {
    return this.userService.useCredits(userId, query);
  }
}
