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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const index_dto_1 = require("../../user/dto/index.dto");
const user_service_1 = require("../../user/user.service");
const user_decorator_1 = require("../../utils/user.decorator");
const auth_service_1 = require("../services/auth.service");
const index_dto_2 = require("../dto/index.dto");
const local_auth_guard_1 = require("../guard/local-auth.guard");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async login(user, loginUser) {
        return this.authService.login(user);
    }
    async createUser(createUserDto) {
        return this.authService.createUser(createUserDto);
    }
    async verifyUser(token) {
        return this.authService.verifyUser(token);
    }
    async getAgainVerifyUser(query) {
        return this.authService.getAgainVerifyUser(query);
    }
    async createNewPassword(body) {
        return this.authService.createNewPassword(body);
    }
    async forgetPassword(body) {
        return this.authService.forgetPassword(body);
    }
    async generateNewToken(body) {
        return this.authService.generateNewToken(body);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_dto_1.CreateUserDto, index_dto_2.LoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('verify/:token'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyUser", null);
__decorate([
    (0, common_1.Get)('get-again-verify-user'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_dto_2.GetAgainVerifyUser]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getAgainVerifyUser", null);
__decorate([
    (0, common_1.Post)('create-new-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_dto_2.CreateNewPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createNewPassword", null);
__decorate([
    (0, common_1.Post)('forget-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_dto_2.ForgetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgetPassword", null);
__decorate([
    (0, common_1.Post)('generate-new-token'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_dto_2.GenerateNewTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "generateNewToken", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)({
        path: 'auth',
        version: '1',
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map