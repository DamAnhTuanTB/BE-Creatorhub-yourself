import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum TypePriceEnum {
  MAIN = 'main',
  SALE25 = 'sale25',
  SALE50 = 'sale50',
}
export class CreateOrderDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  priceId: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  redirectUrl: string;
}

export class QueryGetListPriceDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    enum: TypePriceEnum,
    enumName: 'TypePriceEnum',
  })
  @IsEnum(TypePriceEnum)
  @Expose()
  type: TypePriceEnum;
}
