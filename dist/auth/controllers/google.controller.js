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
exports.GoogleController = void 0;
const common_1 = require("@nestjs/common");
const oauth2_service_1 = require("../services/oauth2.service");
const google_oauth_guard_1 = require("../guard/google-oauth.guard");
const swagger_1 = require("@nestjs/swagger");
let GoogleController = class GoogleController {
    constructor(oauth2Service) {
        this.oauth2Service = oauth2Service;
    }
    async googleAuth() { }
    async googleAuthRedirect(req, res) {
        return this.oauth2Service.googleLogin(req, res);
    }
};
exports.GoogleController = GoogleController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(google_oauth_guard_1.GoogleOAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GoogleController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('redirect'),
    (0, common_1.UseGuards)(google_oauth_guard_1.GoogleOAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GoogleController.prototype, "googleAuthRedirect", null);
exports.GoogleController = GoogleController = __decorate([
    (0, swagger_1.ApiTags)('Google'),
    (0, common_1.Controller)({
        path: 'google',
        version: '1',
    }),
    __metadata("design:paramtypes", [oauth2_service_1.OAuth2Service])
], GoogleController);
//# sourceMappingURL=google.controller.js.map