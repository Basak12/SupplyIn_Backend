import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as path from "path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.use((req, res, next) => {
    if (!req.originalUrl.startsWith('/api')) { // API istekleri dışında
      res.sendFile(path.resolve(__dirname, 'public', 'index.html')); // index.html'e yönlendir
    } else {
      next();
    }
  });

  await app.listen(configService.get<number>('PORT') || 5050);
}
bootstrap();