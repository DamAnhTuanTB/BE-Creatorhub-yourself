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
exports.FacebookController = void 0;
const common_1 = require("@nestjs/common");
const oauth2_service_1 = require("../services/oauth2.service");
const swagger_1 = require("@nestjs/swagger");
const facebook_oauth_guard_1 = require("../guard/facebook-oauth.guard");
let FacebookController = class FacebookController {
    constructor(oauth2Service) {
        this.oauth2Service = oauth2Service;
    }
    async facebookAuth() { }
    async facebookAuthRedirect(req, res) {
        return this.oauth2Service.facebookLogin(req, res);
    }
};
exports.FacebookController = FacebookController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(facebook_oauth_guard_1.FacebookOAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FacebookController.prototype, "facebookAuth", null);
__decorate([
    (0, common_1.Get)('redirect'),
    (0, common_1.UseGuards)(facebook_oauth_guard_1.FacebookOAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FacebookController.prototype, "facebookAuthRedirect", null);
exports.FacebookController = FacebookController = __decorate([
    (0, swagger_1.ApiTags)('Facebook'),
    (0, common_1.Controller)({
        path: 'facebook',
        version: '1',
    }),
    __metadata("design:paramtypes", [oauth2_service_1.OAuth2Service])
], FacebookController);
//# sourceMappingURL=facebook.controller.js.map