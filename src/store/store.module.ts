import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreSchema } from './model/store.model';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { S3Module } from '../s3/s3.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Store',
        schema: StoreSchema,
      },
    ]),
    S3Module,
    ConfigModule
  ],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule {}
