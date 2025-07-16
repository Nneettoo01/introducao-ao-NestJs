import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API de Users')
    .setDescription(
      'Documentão da API de usuários com NestJS + Prisma + Swagger',
    )
    .setVersion('1.0')
    .addTag('users') // Esquema JWT Bearer
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'authorization',
      in: 'header',
    })
    .build(); // Construir a configuração

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remova propiedades não decoradas no DTO
      forbidNonWhitelisted: true, // Retorna erro se enviar propiedades não permitidas
      transform: true, // Transforma os tipos automaticamente (ex: string => number)
    }),
  );

  await app.listen(3000);
}
bootstrap();
