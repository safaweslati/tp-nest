import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //par defaut à false , permet de transformer les types variables que j'ai envoyé dans la requete en des types que j'ai specifié
      transform: true,
      //pour ne pas accepter les données hors de dto
      whitelist: true,
      //throw an exeption if there is a whitelisted properties
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
