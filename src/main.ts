import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200', // Specify the allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed methods
    allowedHeaders: 'Content-Type, Accept, Authorization', // Specify allowed headers
    credentials: true, // If you need to support cookies/authorization headers
  });

  const config = new DocumentBuilder()
    .setTitle('SDA Global')
    .setDescription('SDA Global API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
