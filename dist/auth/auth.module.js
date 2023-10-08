"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const mail_module_1 = require("../mail/mail.module");
const user_module_1 = require("./../user/user.module");
const auth_controller_1 = require("./controllers/auth.controller");
const auth_service_1 = require("./services/auth.service");
const constants_1 = require("./constants");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
const local_strategy_1 = require("./strategy/local.strategy");
const config_1 = require("@nestjs/config");
const oauth2_service_1 = require("./services/oauth2.service");
const google_strategy_1 = require("./strategy/google.strategy");
const google_controller_1 = require("./controllers/google.controller");
const facebook_strategy_1 = require("./strategy/facebook.strategy");
const facebook_controller_1 = require("./controllers/facebook.controller");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '24h' },
            }),
            mail_module_1.MailModule,
            config_1.ConfigModule,
        ],
        controllers: [auth_controller_1.AuthController, google_controller_1.GoogleController, facebook_controller_1.FacebookController],
        providers: [
            auth_service_1.AuthService,
            oauth2_service_1.OAuth2Service,
            jwt_strategy_1.JwtStrategy,
            local_strategy_1.LocalStrategy,
            google_strategy_1.GoogleStrategy,
            facebook_strategy_1.FacebookStrategy,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map