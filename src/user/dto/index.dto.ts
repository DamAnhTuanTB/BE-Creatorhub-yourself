import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum TypeUseEnum {
  AI_ART = 'AI_ART',
  ENHANCE = 'ENHANCE',
  REMOVE_BACKGROUND = 'REMOVE_BACKGROUND',
  CROP = 'CROP',
}
export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  email: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  password: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  firstName: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  lastName: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  redirectUrl: string;
}

export class QueryTypeUseDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    enum: TypeUseEnum,
    enumName: 'TypeUseEnum',
  })
  @IsEnum(TypeUseEnum)
  @Expose()
  type: TypeUseEnum;
}
