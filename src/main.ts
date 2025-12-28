import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilters } from './common/filters/all-exeption.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalFilters(new AllExceptionsFilters())

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  await app.listen(process.env.PORT ?? 3000);


}
bootstrap();
