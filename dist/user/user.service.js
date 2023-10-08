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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const utils_1 = require("../utils");
const bcrypt_1 = require("../utils/bcrypt");
const message_1 = require("../utils/message");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(UserModel, jwtService) {
        this.UserModel = UserModel;
        this.jwtService = jwtService;
    }
    async getDetailUser(user) {
        delete user.password;
        delete user.isVerified;
        return {
            data: (0, utils_1.formatedResponse)(user),
        };
    }
    async findUserByEmail(email) {
        return await this.UserModel.findOne({ email, isVerified: true }).lean();
    }
    async findUserByEmailNotActive(email) {
        return await this.UserModel.findOne({ email, isVerified: false });
    }
    async createUser(createUserDto) {
        const user = await this.UserModel.findOne({ email: createUserDto.email });
        const password = (0, bcrypt_1.encodePassword)(createUserDto.password);
        if (user) {
            await this.UserModel.updateOne({ email: createUserDto.email }, {
                ...createUserDto,
                password,
            });
        }
        else {
            await this.UserModel.create({ ...createUserDto, password });
        }
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: message_1.SuccessRegister,
        };
    }
    async verifyUser(email) {
        await this.UserModel.updateOne({ email }, { isVerified: true });
        return {
            message: 'OK',
        };
    }
    async updateNewPassword(email, password) {
        const newPassword = (0, bcrypt_1.encodePassword)(password);
        await this.UserModel.updateOne({ email }, { password: newPassword });
        return {
            message: 'OK',
        };
    }
    async updateUserWhenPaymentSuccess(userId, price) {
        const userCurrent = await this.UserModel.findById(userId).lean();
        const creditsCurrent = userCurrent.credits || 0;
        await this.UserModel.updateOne({ _id: userId }, { credits: creditsCurrent + Number(price?.metadata?.credits) });
        return {
            message: 'OK',
        };
    }
    async useCredits(userId, query) {
        const userCurrent = await this.UserModel.findById(userId).lean();
        const creditsCurrent = userCurrent.credits;
        if (creditsCurrent < utils_1.numberCreditUse[query.type]) {
            throw new common_1.HttpException('Your credits is not enable.', common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            await this.UserModel.updateOne({ _id: userId }, { credits: creditsCurrent - utils_1.numberCreditUse[query.type] });
            return {
                message: 'OK',
            };
        }
    }
    async loginWithOauth2(user) {
        const userCurrent = await this.UserModel.findOne({ email: user.email });
        const token = this.jwtService.sign({ email: user.email });
        const refreshToken = this.jwtService.sign({ email: user.email }, { expiresIn: '7d' });
        if (userCurrent && !userCurrent.isVerified) {
            await this.UserModel.updateOne({ email: user.email }, { isVerified: true });
        }
        if (!userCurrent) {
            await this.UserModel.create({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                isVerified: true,
            });
        }
        return {
            accessToken: token,
            refreshToken,
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map