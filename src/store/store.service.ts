import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { S3Service } from './../s3/s3.service';

import { ConfigService } from '@nestjs/config';
import { formatedResponse, getParamsPagination } from '../utils';
import {
  QueryDeleteStoreDto,
  QueryGetListStoreDto,
  SortDateEnum,
} from './dto/index.dto';
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

  async getListImage(userId: string, query: QueryGetListStoreDto) {
    const limit = Number(query?.limit) || 10;
    const page = Number(query?.page) || 1;
    const { skip } = getParamsPagination({ page, limit });

    const sort: any = {};
    if (query.sortDate === SortDateEnum.DECREASE) {
      sort.createdAt = -1;
    } else if (query.sortDate === SortDateEnum.INCREASE) {
      sort.createdAt = 1;
    }

    const total = await this.StoreModel.countDocuments({ userId });

    const results = await this.StoreModel.find({ userId })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    return {
      page,
      limit,
      total,
      data: results.map((item: any) => {
        const result: any = formatedResponse(item);
        delete result.userId;
        return result;
      }),
    };
  }

  // async getDetailImage(id: string) {
  //   const result = await this.StoreModel.findById('id').lean();
  //   return {
  //     data: formatedResponse(result),
  //   };
  // }

  async deleteImages(query: QueryDeleteStoreDto) {
    await this.StoreModel.deleteMany({
      _id: { $in: query.idArr },
    });
    return {
      message: 'OK',
    };
  }
}
