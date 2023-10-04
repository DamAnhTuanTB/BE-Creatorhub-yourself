import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  RawBodyRequest,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StripeService } from './stripe.service';
import { CreateOrderDto, QueryGetListPriceDto } from './dto/index.dto';
import { MissStripeSignature } from '../utils/message';
import { User } from '../utils/user.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@ApiTags('Stripe')
@Controller({
  path: 'stripe',
  version: '1',
})
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('prices')
  @HttpCode(HttpStatus.OK)
  async getPrices() {
    return this.stripeService.getPrices();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('order')
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() body: CreateOrderDto, @User('_id') userId: string) {
    return this.stripeService.createOrder(body, userId);
  }

  @Post('webhooks')
  @HttpCode(HttpStatus.CREATED)
  async listenWebhooks(@Req() req: RawBodyRequest<Request>) {
    const stripeSignature = req.header('stripe-signature');
    if (!stripeSignature)
      throw new HttpException(
        MissStripeSignature,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    const result = await this.stripeService.listenWebhooks(
      stripeSignature,
      req.body,
    );
    return result;
  }
}
