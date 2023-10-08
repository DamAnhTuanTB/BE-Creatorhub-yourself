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
exports.QueryTypeUseDto = exports.CreateUserDto = exports.TypeUseEnum = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var TypeUseEnum;
(function (TypeUseEnum) {
    TypeUseEnum["AI_ART"] = "AI_ART";
    TypeUseEnum["ENHANCE"] = "ENHANCE";
    TypeUseEnum["REMOVE_BACKGROUND"] = "REMOVE_BACKGROUND";
    TypeUseEnum["CROP"] = "CROP";
})(TypeUseEnum || (exports.TypeUseEnum = TypeUseEnum = {}));
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "redirectUrl", void 0);
class QueryTypeUseDto {
}
exports.QueryTypeUseDto = QueryTypeUseDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        enum: TypeUseEnum,
        enumName: 'TypeUseEnum',
    }),
    (0, class_validator_1.IsEnum)(TypeUseEnum),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], QueryTypeUseDto.prototype, "type", void 0);
//# sourceMappingURL=index.dto.js.map