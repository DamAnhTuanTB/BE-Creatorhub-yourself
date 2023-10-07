import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @Expose()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @Expose()
  password: string;
}

export class ForgetPasswordDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @Expose()
  email: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  redirectUrl: string;
}

export class CreateNewPasswordDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @Expose()
  token: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @Expose()
  password: string;
}

export class GetAgainVerifyUser {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @Expose()
  email: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  redirectUrl: string;
}

export class GenerateNewTokenDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @Expose()
  refreshToken: string;
}
