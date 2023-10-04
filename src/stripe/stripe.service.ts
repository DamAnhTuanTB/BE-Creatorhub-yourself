import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { handleError } from '../utils';
import Stripe from 'stripe';
import { CreateOrderDto } from './dto/index.dto';

@Injectable()
export class StripeService {
  stripe: Stripe;
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    this.stripe = new Stripe(
      configService.get<string>('PAYMENT.STRIPE_SECRET_KEY'),
      {
        apiVersion: '2023-08-16',
      },
    );
  }

  async getPrices() {
    try {
      const prices = await this.stripe?.prices?.list({ active: true });

      return prices.data
        .filter((item: any) => item?.metadata?.label === 'creatorhub')
        .sort(
          (a: any, b: any) => a?.metadata?.priceOrder - b?.metadata?.priceOrder,
        )
        .map((item: any) => ({
          id: item?.id,
          name: item?.metadata?.name,
          price: Number(item?.metadata?.price),
          credits: Number(item?.metadata?.credits),
        }));
    } catch (error) {
      handleError(error);
    }
  }

  async createOrder(body: CreateOrderDto, userId: string) {
    try {
      const { priceId, redirectUrl } = body;
      const paymentLinks = await this.stripe.paymentLinks.create({
        line_items: [{ price: priceId, quantity: 1 }],
        after_completion: {
          type: 'redirect',
          redirect: {
            url: redirectUrl,
          },
        },
        // automatic_tax: { enabled: true },
      });
      const paymentUrl = paymentLinks.url + `?client_reference_id=${userId}`;
      return { url: paymentUrl };
    } catch (error) {
      handleError(error);
    }
  }

  async listenWebhooks(signature: string, body: any) {
    let event: any;
    try {
      event = this.stripe.webhooks.constructEvent(
        body,
        signature,
        this.configService.get<string>(
          'PAYMENT.STRIPE_WEBHOOK_ENDPOINT_SECRET',
        ),
      );
      const data = event?.data;
      const eventType = event.type || '';

      switch (eventType) {
        case 'checkout.session.completed':
          const userId = data?.object?.client_reference_id || '';
          const detailPrice = await this.stripe.checkout.sessions.retrieve(
            data.object.id,
            {
              expand: ['line_items.data'],
            },
          );

          if (
            detailPrice?.line_items?.data[0].price?.metadata?.label ===
            'creatorhub'
          ) {
            this.userService.updateUserWhenPaymentSuccess(
              userId,
              detailPrice?.line_items?.data[0].price,
            );
          }

        default:
          break;
      }
    } catch (error) {
      console.log('error', error);
      handleError(error);
    }
  }
}
