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
exports.OAuth2Service = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../user/user.service");
let OAuth2Service = class OAuth2Service {
    constructor(userService) {
        this.userService = userService;
    }
    async googleLogin(req, res) {
        const queryFromClient = JSON.parse(req.query.state);
        const { redirect_url } = queryFromClient;
        if (!req.user) {
            return res.status(400).json({ error: 'No user from google' });
        }
        if (!redirect_url) {
            return res.status(400).json({ error: 'Missing redirect url!' });
        }
        const token = await this.userService.loginWithOauth2(req.user);
        res.redirect(redirect_url +
            '?token=' +
            token.accessToken +
            '&refresh_token=' +
            token.refreshToken);
    }
    async facebookLogin(req, res) {
        const queryFromClient = JSON.parse(req.query.state);
        const { redirect_url } = queryFromClient;
        if (!req.user?.user) {
            return res.status(400).json({ error: 'No user from facebook' });
        }
        if (!redirect_url) {
            return res.status(400).json({ error: 'Missing redirect url!' });
        }
        const token = await this.userService.loginWithOauth2(req.user?.user);
        res.redirect(redirect_url +
            '?token=' +
            token.accessToken +
            '&refresh_token=' +
            token.refreshToken);
    }
};
exports.OAuth2Service = OAuth2Service;
exports.OAuth2Service = OAuth2Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], OAuth2Service);
//# sourceMappingURL=oauth2.service.js.map