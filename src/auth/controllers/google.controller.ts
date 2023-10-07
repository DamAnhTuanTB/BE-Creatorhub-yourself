import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { OAuth2Service } from '../services/oauth2.service';
import { Request, Response } from 'express';
// import { AuthGuard } from '@nestjs/passport';
import { GoogleOAuthGuard } from '../guard/google-oauth.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Google')
@Controller({
  path: 'google',
  version: '1',
})
export class GoogleController {
  constructor(private readonly oauth2Service: OAuth2Service) {}

  @Get()
  // @UseGuards(AuthGuard('google'))
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {}

  @Get('redirect')
  // @UseGuards(AuthGuard('google'))
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    return this.oauth2Service.googleLogin(req, res);
  }
}
