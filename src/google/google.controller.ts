import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleService } from './google.service';
import { Request, Response } from 'express';
// import { AuthGuard } from '@nestjs/passport';
import { GoogleOAuthGuard } from '../auth/guard/google-oauth.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Google')
@Controller({
  path: 'google',
  version: '1',
})
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get()
  // @UseGuards(AuthGuard('google'))
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {}

  @Get('redirect')
  // @UseGuards(AuthGuard('google'))
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    return this.googleService.googleLogin(req, res);
  }
}
