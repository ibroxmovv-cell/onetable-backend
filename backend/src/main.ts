import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { json, raw } from 'body-parser';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(json({ limit: '10mb' }));
  const server = app.getHttpAdapter().getInstance() as express.Express;
  // raw body for stripe webhook
  server.use('/api/v1/payments/webhook', raw({ type: 'application/json' }));
  app.enableCors({ origin: true, credentials: true });
  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`Backend listening on ${port}`);
}
bootstrap();
