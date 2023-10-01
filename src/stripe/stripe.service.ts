import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { handleError } from 'src/utils';
import Stripe from 'stripe';
import { CreateOrderDto, QueryGetListPriceDto } from './dto/index.dto';

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

  async getPrices(query: QueryGetListPriceDto) {
    try {
      const prices = await this.stripe?.prices?.list({ active: true });

      return prices.data
        .filter(
          (item: any) =>
            item?.metadata?.type === query?.type &&
            item?.metadata?.label === 'ai-avatar',
        )
        .sort(
          (a: any, b: any) => a?.metadata?.priceOrder - b?.metadata?.priceOrder,
        );
    } catch (error) {
      handleError(error);
    }
  }

  async createOrder(body: CreateOrderDto) {
    try {
      const { priceId, userId, email, redirectUrl } = body;
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
      const paymentUrl =
        paymentLinks.url +
        `?prefilled_email=${email}&client_reference_id=${userId}&customer_email=${email}`;
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
            'ai-avatar'
          ) {
            // this.userService.updateUserWhenPaymentSuccess({
            //   email: data?.object?.customer_details?.email,
            //   userId,
            //   priceInfo: detailPrice?.line_items?.data[0].price,
            // });
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
