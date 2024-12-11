import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  const frontendBuildPath = join(__dirname, '..', 'frontend', 'build');
  app.use(express.static(frontendBuildPath));

  app.use('*', (req, res) => {
    res.sendFile(join(frontendBuildPath, 'index.html'));
  });

  await app.listen(configService.get<number>('PORT'));
}
bootstrap();