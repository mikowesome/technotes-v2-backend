import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { corsOptions } from 'config/corsOptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enables CORS for our api
  app.enableCors(corsOptions)

  // Sets base path for all routes to /api/v1
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )
  await app.listen(process.env.PORT || 3500);
}
bootstrap();