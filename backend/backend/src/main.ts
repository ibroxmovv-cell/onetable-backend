import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { json } from 'body-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(json({ limit: '10mb' }));
  app.enableCors({
    origin: true,
    credentials: true
  });

  const config = app.get(ConfigService);
  const port = config.get('PORT') || 4000;
  await app.listen(port);
  console.log(`Backend listening on ${port}`);
}
bootstrap();
