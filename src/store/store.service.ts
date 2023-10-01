import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { S3Service } from './../s3/s3.service';

import { ConfigService } from '@nestjs/config';
import { StoreDocument } from './model/store.model';
@Injectable()
export class StoreService {
  constructor(
    @InjectModel('Store')
    private readonly StoreModel: Model<StoreDocument>,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}
  async saveImage(file: any, body: any) {
    // const presignLink: any =
    //   await this.s3Service.generateFormDataUpload('my-image.jpg');

    // // console.log(presignLink);
    // const formData = new FormData();
    // for (const property in presignLink?.fields) {
    //   formData.append(property, presignLink?.fields[property]);
    // }

    // formData.append('file', file);

    // console.log(formData);

    // const res = await axios.post(presignLink?.url, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });

    return await this.StoreModel.create({
      url: body.url,
      config: body?.config || {},
      // url: this.configService.get('AWS.CDN') + '/' + presignLink?.fields?.key,
      userId: body.userId,
    });

    // await generateService.uploadFileS3(presign?.data?.url, formData);
    // // const file = await convertFileToBase64(item.file);
    // results.push({
    //   ...item,
    //   file: CONFIG.REACT_APP_AWS_CDN + '/' + presign?.data?.fields?.key,
    // });
  }
}
