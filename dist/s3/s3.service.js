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
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const AWS = require("aws-sdk");
const crypto_1 = require("crypto");
const utils_1 = require("../utils");
let S3Service = class S3Service {
    constructor(configService) {
        this.configService = configService;
        this.createPresignedPostPromise = (params) => {
            return new Promise((resolve, reject) => {
                this.s3.createPresignedPost(params, (err, data) => {
                    if (err)
                        reject(err);
                    else
                        resolve(data);
                });
            });
        };
        this.generateFormDataUpload = async (path) => {
            return await this.s3GeneratePresignLinkToUpload(path);
        };
        this.s3 = new AWS.S3({
            secretAccessKey: this.configService.get('AWS.PRIVATE_KEY'),
            accessKeyId: this.configService.get('AWS.ACCESS_KEY'),
            region: this.configService.get('S3.REGION'),
            signatureVersion: 'v4',
        });
    }
    async s3GeneratePresignLinkToUpload(path) {
        const filename = (0, utils_1.getFileName)(path);
        const fileExtension = (0, utils_1.getFileExtension)(path);
        const s3ObjetName = `video-editor-pro/ai-style-thumbnail/${encodeURI(filename + '-' + (0, crypto_1.randomUUID)() + fileExtension)}`;
        const minContentLength = 0;
        const maxContentLength = 52428800;
        const exp = 900;
        const params = {
            Bucket: this.configService.get('S3.BUCKET'),
            Fields: {
                key: s3ObjetName,
                'Content-Type': 'image/png',
                'Content-Disposition': 'inline',
            },
            Expires: exp,
            Acl: 'public-read',
            Conditions: [
                ['content-length-range', minContentLength, maxContentLength],
            ],
            Metadata: {
                'x-amz-meta-content-type': 'image/png',
                'x-amz-meta-content-disposition': 'inline',
            },
        };
        return await this.createPresignedPostPromise(params);
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], S3Service);
//# sourceMappingURL=s3.service.js.map