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
exports.GoogleStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const dotenv_1 = require("dotenv");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
(0, dotenv_1.config)();
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy) {
    constructor(configService) {
        super({
            clientID: configService.get('GOOGLE_OAUTH.GOOGLE_CLIENT_ID'),
            clientSecret: configService.get('GOOGLE_OAUTH.GOOGLE_SECRET'),
            callbackURL: configService.get('GOOGLE_OAUTH.CALLBACK_URL'),
            scope: ['email', 'profile'],
            passReqToCallback: true,
        });
        this.configService = configService;
    }
    async authenticate(req, options) {
        const stringify = JSON.stringify(req.query);
        super.authenticate(req, {
            ...options,
            state: stringify,
        });
    }
    async validate(req, accessToken, refreshToken, profile, done) {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken,
        };
        done(null, user);
    }
};
exports.GoogleStrategy = GoogleStrategy;
exports.GoogleStrategy = GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], GoogleStrategy);
//# sourceMappingURL=google.strategy.js.map