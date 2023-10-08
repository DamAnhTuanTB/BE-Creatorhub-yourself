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
exports.QueryDeleteStoreDto = exports.QueryGetListStoreDto = exports.CreateStoreDto = exports.SortDateEnum = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var SortDateEnum;
(function (SortDateEnum) {
    SortDateEnum["DECREASE"] = "DECREASE";
    SortDateEnum["INCREASE"] = "INCREASE";
    SortDateEnum["DEFAULT"] = "DEFAULT";
})(SortDateEnum || (exports.SortDateEnum = SortDateEnum = {}));
class CreateStoreDto {
}
exports.CreateStoreDto = CreateStoreDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], CreateStoreDto.prototype, "config", void 0);
class QueryGetListStoreDto {
}
exports.QueryGetListStoreDto = QueryGetListStoreDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], QueryGetListStoreDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], QueryGetListStoreDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: SortDateEnum,
        enumName: 'SortDateEnum',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SortDateEnum),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], QueryGetListStoreDto.prototype, "sortDate", void 0);
class QueryDeleteStoreDto {
}
exports.QueryDeleteStoreDto = QueryDeleteStoreDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], QueryDeleteStoreDto.prototype, "idArr", void 0);
//# sourceMappingURL=index.dto.js.map