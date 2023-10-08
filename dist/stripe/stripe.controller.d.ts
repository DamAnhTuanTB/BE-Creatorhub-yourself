import { RawBodyRequest } from '@nestjs/common';
import { Request } from 'express';
import { StripeService } from './stripe.service';
import { CreateOrderDto } from './dto/index.dto';
export declare class StripeController {
    private readonly stripeService;
    constructor(stripeService: StripeService);
    getPrices(): Promise<{
        id: any;
        name: any;
        price: number;
        credits: number;
    }[]>;
    createOrder(body: CreateOrderDto, userId: string): Promise<{
        url: string;
    }>;
    listenWebhooks(req: RawBodyRequest<Request>): Promise<void>;
}
