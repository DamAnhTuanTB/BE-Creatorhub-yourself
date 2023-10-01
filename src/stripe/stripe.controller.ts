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
} from '@nestjs/common';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { StripeService } from './stripe.service';
import { CreateOrderDto, QueryGetListPriceDto } from './dto/index.dto';
import { MissStripeSignature } from 'src/utils/message';

@ApiTags('Stripe')
@Controller({
  path: 'stripe',
  version: '1',
})
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('prices')
  @HttpCode(HttpStatus.OK)
  async getPrices(@Query() query: QueryGetListPriceDto) {
    return this.stripeService.getPrices(query);
  }

  @Post('order')
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() body: CreateOrderDto) {
    return this.stripeService.createOrder(body);
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
