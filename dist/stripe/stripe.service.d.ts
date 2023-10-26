import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { UserService } from '../user/user.service';
import { CreateOrderDto } from './dto/index.dto';
export declare class StripeService {
    private readonly userService;
    private readonly configService;
    stripe: Stripe;
    constructor(userService: UserService, configService: ConfigService);
    getPrices(): Promise<{
        id: any;
        name: any;
        price: number;
        credits: number;
    }[]>;
    createOrder(body: CreateOrderDto, userId: string): Promise<{
        url: string;
    }>;
    listenWebhooks(signature: string, body: any): Promise<void>;
}
