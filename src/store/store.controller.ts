import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { User } from '../utils/user.decorator';
import {
  CreateStoreDto,
  QueryDeleteStoreDto,
  QueryGetListStoreDto,
} from './dto/index.dto';
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
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  saveImage(
    @UploadedFile() file,
    @Body() body: CreateStoreDto,
    @User('_id') userId: string,
  ) {
    return this.storeService.saveImage(file, { ...body, userId });
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  getListImage(
    @User('_id') userId: string,
    @Query() query: QueryGetListStoreDto,
  ) {
    return this.storeService.getListImage(userId, query);
  }

  @Delete('')
  @HttpCode(HttpStatus.OK)
  deleteImage(@Query() query: QueryDeleteStoreDto) {
    return this.storeService.deleteImages(query);
  }
}
