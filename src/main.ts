import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Create Swagger configuration
  const config = new DocumentBuilder()
  .setTitle('Bike Library API')
  .setDescription('API for managing a bike library')
  .setVersion('1.0')
  .addTag('bikes')
  .addBearerAuth()
  .build();

  // Create the Swagger document
  const document = SwaggerModule.createDocument(app, config);
  
  // Setup the Swagger UI on `/api` path
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
