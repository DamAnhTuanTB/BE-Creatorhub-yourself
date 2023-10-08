"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const store_model_1 = require("./model/store.model");
const store_controller_1 = require("./store.controller");
const store_service_1 = require("./store.service");
const s3_module_1 = require("../s3/s3.module");
const config_1 = require("@nestjs/config");
let StoreModule = class StoreModule {
};
exports.StoreModule = StoreModule;
exports.StoreModule = StoreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'Store',
                    schema: store_model_1.StoreSchema,
                },
            ]),
            s3_module_1.S3Module,
            config_1.ConfigModule
        ],
        controllers: [store_controller_1.StoreController],
        providers: [store_service_1.StoreService],
        exports: [store_service_1.StoreService],
    })
], StoreModule);
//# sourceMappingURL=store.module.js.map