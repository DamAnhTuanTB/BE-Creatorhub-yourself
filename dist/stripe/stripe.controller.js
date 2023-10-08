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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const stripe_service_1 = require("./stripe.service");
const index_dto_1 = require("./dto/index.dto");
const message_1 = require("../utils/message");
const user_decorator_1 = require("../utils/user.decorator");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
let StripeController = class StripeController {
    constructor(stripeService) {
        this.stripeService = stripeService;
    }
    async getPrices() {
        return this.stripeService.getPrices();
    }
    async createOrder(body, userId) {
        return this.stripeService.createOrder(body, userId);
    }
    async listenWebhooks(req) {
        const stripeSignature = req.header('stripe-signature');
        if (!stripeSignature)
            throw new common_1.HttpException(message_1.MissStripeSignature, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        const result = await this.stripeService.listenWebhooks(stripeSignature, req.body);
        return result;
    }
};
exports.StripeController = StripeController;
__decorate([
    (0, common_1.Get)('prices'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "getPrices", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('order'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_dto_1.CreateOrderDto, String]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Post)('webhooks'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "listenWebhooks", null);
exports.StripeController = StripeController = __decorate([
    (0, swagger_1.ApiTags)('Stripe'),
    (0, common_1.Controller)({
        path: 'stripe',
        version: '1',
    }),
    __metadata("design:paramtypes", [stripe_service_1.StripeService])
], StripeController);
//# sourceMappingURL=stripe.controller.js.map