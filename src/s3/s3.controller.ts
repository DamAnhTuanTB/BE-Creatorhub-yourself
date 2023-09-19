import { Controller, Get, Query } from '@nestjs/common';
import { S3Service } from './s3.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Upload to S3')
@Controller({
  path: 'presign-link',
  version: '1',
})
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Get()
  async getPresignUrl(@Query() query) {
    const { filename } = query;
    const presignLink = await this.s3Service.generateFormDataUpload(filename);
    return presignLink;
  }
}
