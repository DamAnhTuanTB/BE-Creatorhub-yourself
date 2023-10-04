/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StoreDocument = Store & Document;

@Schema()
export class Store {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: false, type: Object })
  config: any;

  @Prop({ required: true, type: Date, default: new Date() })
  createdAt: Date;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
