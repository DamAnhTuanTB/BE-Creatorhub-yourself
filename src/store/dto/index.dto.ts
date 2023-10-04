import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum SortDateEnum {
  DECREASE = 'DECREASE',
  INCREASE = 'INCREASE',
  DEFAULT = 'DEFAULT',
}

export class CreateStoreDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  url: string;

  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  config: any;
}

export class QueryGetListStoreDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  // @Transform(({ value }) => Number(value))
  @Expose()
  page: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  // @Transform(({ value }) => Number(value))
  @Expose()
  limit: number;

  @ApiPropertyOptional({
    enum: SortDateEnum,
    enumName: 'SortDateEnum',
  })
  @IsOptional()
  @IsEnum(SortDateEnum)
  @Expose()
  sortDate: SortDateEnum;
}

export class QueryDeleteStoreDto {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  idArr: string[];
}
