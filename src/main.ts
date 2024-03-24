import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe());

  // Swagger (Docs)
  const config = new DocumentBuilder()
  .setTitle('Lucky APIs')
  .setDescription('The Lucky API description')
  .setVersion('1.0')
  .addTag('auth', 'เข้าสู่ระบบ - success')
  .addTag('users', 'จัดการ Admin - success')
  .addTag('customers', 'จัดการ Customer - todo')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const env = configService.get('NODE_ENV');

  console.log("-- App Running INFO --");
  console.log(`PORT: ${port}`);
  console.log(`ENV: ${env}`); 

  await app.listen(port);
}
bootstrap();
