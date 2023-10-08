"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bodyParser: false,
        cors: true,
    });
    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    });
    const options = new swagger_1.DocumentBuilder()
        .setTitle('API Creatorhub')
        .setDescription('')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(9090);
}
bootstrap();
//# sourceMappingURL=main.js.map