"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const stripe_1 = require("stripe");
const user_service_1 = require("../user/user.service");
const utils_1 = require("../utils");
let StripeService = class StripeService {
    constructor(userService, configService) {
        this.userService = userService;
        this.configService = configService;
        this.stripe = new stripe_1.default('sk_test_51NKzLUFXtVXZe9q3vrCTYTY3Bct5imsQoHlqo8nGcm5kZWs0tY8ZvLJWBygiodRnB6BhbpdnqBuMKrl1mrsMY9gR00FmUxJqdR', {
            apiVersion: '2023-08-16',
        });
    }
    async getPrices() {
        try {
            const prices = await this.stripe?.prices?.list({ active: true });
            return prices.data
                .filter((item) => item?.metadata?.label === 'creatorhub')
                .sort((a, b) => a?.metadata?.priceOrder - b?.metadata?.priceOrder)
                .map((item) => ({
                id: item?.id,
                name: item?.metadata?.name,
                price: Number(item?.metadata?.price),
                credits: Number(item?.metadata?.credits),
            }));
        }
        catch (error) {
            (0, utils_1.handleError)(error);
        }
    }
    async createOrder(body, userId) {
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
            });
            const paymentUrl = paymentLinks.url + `?client_reference_id=${userId}`;
            return { url: paymentUrl };
        }
        catch (error) {
            (0, utils_1.handleError)(error);
        }
    }
    async listenWebhooks(signature, body) {
        let event;
        try {
            event = this.stripe.webhooks.constructEvent(body, signature, 'whsec_Kwh0O5BM9JnSYjNis3irrNKqLEqmSRr8');
            const data = event?.data;
            const eventType = event.type || '';
            switch (eventType) {
                case 'checkout.session.completed':
                    const userId = data?.object?.client_reference_id || '';
                    const detailPrice = await this.stripe.checkout.sessions.retrieve(data.object.id, {
                        expand: ['line_items.data'],
                    });
                    if (detailPrice?.line_items?.data[0].price?.metadata?.label ===
                        'creatorhub') {
                        this.userService.updateUserWhenPaymentSuccess(userId, detailPrice?.line_items?.data[0].price);
                    }
                default:
                    break;
            }
        }
        catch (error) {
            console.log('error', error);
            (0, utils_1.handleError)(error);
        }
    }
};
exports.StripeService = StripeService;
exports.StripeService = StripeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        config_1.ConfigService])
], StripeService);
//# sourceMappingURL=stripe.service.js.map