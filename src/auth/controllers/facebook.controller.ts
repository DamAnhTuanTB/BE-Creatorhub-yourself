import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { OAuth2Service } from '../services/oauth2.service';
import { Request, Response } from 'express';
// import { AuthGuard } from '@nestjs/passport';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { FacebookOAuthGuard } from '../guard/facebook-oauth.guard';

@ApiTags('Facebook')
@Controller({
  path: 'facebook',
  version: '1',
})
export class FacebookController {
  constructor(private readonly oauth2Service: OAuth2Service) {}

  @Get()
  // @UseGuards(AuthGuard('google'))
  @UseGuards(FacebookOAuthGuard)
  async facebookAuth() {}

  @Get('redirect')
  // @UseGuards(AuthGuard('google'))
  @UseGuards(FacebookOAuthGuard)
  async facebookAuthRedirect(@Req() req: Request, @Res() res: Response) {
    return this.oauth2Service.facebookLogin(req, res);
  }
}
