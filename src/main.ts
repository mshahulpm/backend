import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const PORT = 7600

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1');

  const options = new DocumentBuilder()
    .setTitle('API Name')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('api-ok')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'Bearer',
      in: 'Header',

    },
      'Authorization',
    )
    // .addSecurity('Authorization', {
    //   type: 'http',
    //   scheme: 'bearer',
    //   bearerFormat: 'Bearer',
    //   in: 'Header'
    // })
    // .addSecurityRequirements('Authorization')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true
    }
  });

  await app.listen(PORT);
  console.log(`server is up on ${PORT}`)
}
bootstrap();
