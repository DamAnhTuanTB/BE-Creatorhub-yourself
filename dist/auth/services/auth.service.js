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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const mail_service_1 = require("../../mail/mail.service");
const user_service_1 = require("../../user/user.service");
const bcrypt_1 = require("../../utils/bcrypt");
const message_1 = require("../../utils/message");
let AuthService = class AuthService {
    constructor(userService, jwtService, mailService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.configService = configService;
    }
    async validateUser(email, password) {
        const userDB = await this.userService.findUserByEmail(email);
        if (userDB) {
            const matched = (0, bcrypt_1.comparePassword)(password, userDB.password);
            if (matched) {
                return userDB;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
    async login(user) {
        const payload = { email: user.email, _id: user._id };
        return {
            token: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
        };
    }
    async createUser(body) {
        const user = await this.userService.findUserByEmail(body.email);
        if (user) {
            throw new common_1.HttpException(message_1.EmailExists, common_1.HttpStatus.BAD_REQUEST);
        }
        const token = this.jwtService.sign({ email: body.email });
        this.mailService.sendMail({
            to: body.email,
            subject: 'Xác minh email đăng ký tài khoản từ hệ thống Creatorhub AI',
            template: './verify-user',
            context: {
                link: `${body.redirectUrl}?token=${token}&email=${body.email}`,
            },
        });
        await this.userService.createUser(body);
        return {
            message: 'OK',
        };
    }
    async getAgainVerifyUser(query) {
        const user = await this.userService.findUserByEmailNotActive(query.email);
        if (user) {
            const token = this.jwtService.sign({ email: query.email });
            this.mailService.sendMail({
                to: query.email,
                subject: 'Xác minh email đăng ký tài khoản từ hệ thống Creatorhub AI',
                template: './verify-user',
                context: {
                    link: `${query.redirectUrl}?token=${token}&email=${query.email}`,
                },
            });
            return {
                message: 'OK',
            };
        }
        else {
            throw new common_1.HttpException(message_1.ErrorGetAgainVerifyUser, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async verifyUser(token) {
        try {
            const user = this.jwtService.verify(token);
            return this.userService.verifyUser(user.email);
        }
        catch {
            throw new common_1.HttpException(message_1.TokenExpired, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async forgetPassword(body) {
        const userDB = await this.userService.findUserByEmail(body.email);
        if (userDB) {
            const token = this.jwtService.sign({ email: body.email });
            this.mailService.sendMail({
                to: body.email,
                subject: 'Đổi mật khẩu từ tài khoản Creatorhub AI',
                template: './forget-password',
                context: {
                    link: `${body.redirectUrl}?token=${token}&email=${body.email}`,
                },
            });
            return {
                message: 'OK',
            };
        }
        else {
            throw new common_1.HttpException(message_1.ErrorForgetPassword, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createNewPassword(body) {
        try {
            const user = this.jwtService.verify(body.token);
            return this.userService.updateNewPassword(user.email, body.password);
        }
        catch {
            throw new common_1.HttpException(message_1.ErrorCreateNewPassword, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async generateNewToken(body) {
        try {
            const payload = this.jwtService.verify(body.refreshToken);
            const token = this.jwtService.sign({
                email: payload.email,
                _id: payload._id,
            });
            const refreshToken = this.jwtService.sign({ email: payload.email, _id: payload._id }, { expiresIn: '7d' });
            return {
                token,
                refreshToken,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        mail_service_1.MailService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map