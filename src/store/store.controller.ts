import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { User } from '../utils/user.decorator';
import { CreateStoreDto } from './dto/index.dto';
import { StoreService } from './store.service';

@ApiTags('Store')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({
  path: 'store',
  version: '1',
})
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post('save-image')
  @UseInterceptors(FileInterceptor('file'))
  saveImage(
    @UploadedFile() file,
    @Body() body: CreateStoreDto,
    @User('_id') userId: string,
  ) {
    return this.storeService.saveImage(file, { ...body, userId });
  }
}
