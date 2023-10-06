import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleService } from './google.service';
import { Request, Response } from 'express';
// import { AuthGuard } from '@nestjs/passport';
import { GoogleOAuthGuard } from '../auth/guard/google-oauth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get()
  // @UseGuards(AuthGuard('google'))
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {
    console.log('hahahahaahah');
  }

  @Get('redirect')
  // @UseGuards(AuthGuard('google'))
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    return this.googleService.googleLogin(req, res);
  }
}
