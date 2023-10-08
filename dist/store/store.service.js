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
exports.StoreService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const s3_service_1 = require("./../s3/s3.service");
const config_1 = require("@nestjs/config");
const utils_1 = require("../utils");
const index_dto_1 = require("./dto/index.dto");
let StoreService = class StoreService {
    constructor(StoreModel, s3Service, configService) {
        this.StoreModel = StoreModel;
        this.s3Service = s3Service;
        this.configService = configService;
    }
    async saveImage(file, body) {
        return await this.StoreModel.create({
            url: body.url,
            config: body?.config || {},
            userId: body.userId,
        });
    }
    async getListImage(userId, query) {
        const limit = Number(query?.limit) || 10;
        const page = Number(query?.page) || 1;
        const { skip } = (0, utils_1.getParamsPagination)({ page, limit });
        const sort = {};
        if (query.sortDate === index_dto_1.SortDateEnum.DECREASE) {
            sort.createdAt = -1;
        }
        else if (query.sortDate === index_dto_1.SortDateEnum.INCREASE) {
            sort.createdAt = 1;
        }
        const results = await this.StoreModel.find({ userId })
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean()
            .exec();
        return {
            data: results.map((item) => {
                const result = (0, utils_1.formatedResponse)(item);
                delete result.userId;
                return result;
            }),
        };
    }
    async deleteImages(query) {
        await this.StoreModel.deleteMany({
            _id: { $in: query.idArr },
        });
        return {
            message: 'OK',
        };
    }
};
exports.StoreService = StoreService;
exports.StoreService = StoreService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Store')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        s3_service_1.S3Service,
        config_1.ConfigService])
], StoreService);
//# sourceMappingURL=store.service.js.map