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
exports.StoreController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const user_decorator_1 = require("../utils/user.decorator");
const index_dto_1 = require("./dto/index.dto");
const store_service_1 = require("./store.service");
let StoreController = class StoreController {
    constructor(storeService) {
        this.storeService = storeService;
    }
    saveImage(file, body, userId) {
        return this.storeService.saveImage(file, { ...body, userId });
    }
    getListImage(userId, query) {
        return this.storeService.getListImage(userId, query);
    }
    deleteImage(query) {
        return this.storeService.deleteImages(query);
    }
};
exports.StoreController = StoreController;
__decorate([
    (0, common_1.Post)('save-image'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.User)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, index_dto_1.CreateStoreDto, String]),
    __metadata("design:returntype", void 0)
], StoreController.prototype, "saveImage", null);
__decorate([
    (0, common_1.Get)(''),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, user_decorator_1.User)('_id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, index_dto_1.QueryGetListStoreDto]),
    __metadata("design:returntype", void 0)
], StoreController.prototype, "getListImage", null);
__decorate([
    (0, common_1.Delete)(''),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_dto_1.QueryDeleteStoreDto]),
    __metadata("design:returntype", void 0)
], StoreController.prototype, "deleteImage", null);
exports.StoreController = StoreController = __decorate([
    (0, swagger_1.ApiTags)('Store'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)({
        path: 'store',
        version: '1',
    }),
    __metadata("design:paramtypes", [store_service_1.StoreService])
], StoreController);
//# sourceMappingURL=store.controller.js.map