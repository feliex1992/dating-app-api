import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Dating App API')
    .setDescription('Dating App API description')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();
  const options: SwaggerCustomOptions = {
    swaggerOptions: { docExpansion: 'none' },
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`api/docs`, app, document, options);

  await app.listen(process.env.PORT || 3048);
}
bootstrap();
