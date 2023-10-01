import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import configuration from './configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  // app.setGlobalPrefix('nextapi', {
  //   exclude: ['/health'],
  // });
  const options = new DocumentBuilder()
    .setTitle('API Creatorhub')
    .setDescription('')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(9090);
}
bootstrap();
