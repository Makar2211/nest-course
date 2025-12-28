import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilters } from './common/filters/all-exeption.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nest Course API')
    .setDescription('The nest-course API documentation')
    .setVersion('1.0')
    .addBasicAuth()
    .setContact('GitHub', "https://github.com/Makar2211/nest-course", "makardovgopolji@gmail.com")
    .addTag('nest-course')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config, {
    include: [],
    extraModels: [],
    operationIdFactory: (controllerKey: string, methodKey: string) => `${controllerKey}-${methodKey}`,
  });
  SwaggerModule.setup('/docs', app, documentFactory, {
    jsonDocumentUrl: '/swagger.json',
    yamlDocumentUrl: '/swagger.yaml',
    customSiteTitle: 'Nest Course API Docs',
  });

  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalFilters(new AllExceptionsFilters())

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  await app.listen(process.env.PORT ?? 3000);


}
bootstrap();
