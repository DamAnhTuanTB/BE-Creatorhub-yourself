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
exports.QueryGetListPriceDto = exports.CreateOrderDto = exports.TypePriceEnum = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var TypePriceEnum;
(function (TypePriceEnum) {
    TypePriceEnum["MAIN"] = "main";
    TypePriceEnum["SALE25"] = "sale25";
    TypePriceEnum["SALE50"] = "sale50";
})(TypePriceEnum || (exports.TypePriceEnum = TypePriceEnum = {}));
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "priceId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "redirectUrl", void 0);
class QueryGetListPriceDto {
}
exports.QueryGetListPriceDto = QueryGetListPriceDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        enum: TypePriceEnum,
        enumName: 'TypePriceEnum',
    }),
    (0, class_validator_1.IsEnum)(TypePriceEnum),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], QueryGetListPriceDto.prototype, "type", void 0);
//# sourceMappingURL=index.dto.js.map