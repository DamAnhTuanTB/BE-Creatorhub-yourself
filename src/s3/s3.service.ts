import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { randomUUID } from 'crypto';
import { getFileExtension, getFileName } from '../utils';

@Injectable()
export class S3Service {
  s3: any;
  constructor(private configService: ConfigService) {
    this.s3 = new AWS.S3({
      secretAccessKey: this.configService.get<string>('AWS.PRIVATE_KEY'),
      accessKeyId: this.configService.get<string>('AWS.ACCESS_KEY'),
      region: this.configService.get<string>('S3.REGION'),
      signatureVersion: 'v4',
    });
  }

  async s3GeneratePresignLinkToUpload(path: string) {
    const filename = getFileName(path);
    const fileExtension = getFileExtension(path);
    // const contentType = mime.lookup(filename);
    const s3ObjetName = `video-editor-pro/ai-style-thumbnail/${encodeURI(
      filename + '-' + randomUUID() + fileExtension,
    )}`;
    const minContentLength = 0; // minimum allowed content length in bytes
    const maxContentLength = 52428800; // maximum allowed content length in 50 bytes
    const exp = 900; // 15 mins
    const params = {
      Bucket: this.configService.get<string>('S3.BUCKET'),
      Fields: {
        key: s3ObjetName,
        'Content-Type': 'image/png',
        'Content-Disposition': 'inline',
      },
      Expires: exp,
      Acl: 'public-read',
      Conditions: [
        ['content-length-range', minContentLength, maxContentLength],
      ],
      Metadata: {
        'x-amz-meta-content-type': 'image/png',
        'x-amz-meta-content-disposition': 'inline',
      },
    };
    return await this.createPresignedPostPromise(params);
  }

  createPresignedPostPromise = (params: any) => {
    return new Promise((resolve, reject) => {
      this.s3.createPresignedPost(params, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  };

  generateFormDataUpload = async (path: string) => {
    return await this.s3GeneratePresignLinkToUpload(path);
  };
}
