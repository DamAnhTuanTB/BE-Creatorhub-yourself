import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { UserService } from '../user/user.service';
import { handleError } from '../utils';
import { CreateOrderDto } from './dto/index.dto';

@Injectable()
export class StripeService {
  stripe: Stripe;
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    this.stripe = new Stripe(
      'sk_test_51NKzLUFXtVXZe9q3vrCTYTY3Bct5imsQoHlqo8nGcm5kZWs0tY8ZvLJWBygiodRnB6BhbpdnqBuMKrl1mrsMY9gR00FmUxJqdR',
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
        'whsec_Kwh0O5BM9JnSYjNis3irrNKqLEqmSRr8',
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
