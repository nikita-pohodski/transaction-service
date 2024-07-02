import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions } from '@nestjs/microservices';
import { kafkaOptionsFactory } from './config/kafka/kafka.config';
import { INestApplication } from '@nestjs/common';

function initKafka(app: INestApplication) {
  app.connectMicroservice<MicroserviceOptions>(kafkaOptionsFactory());
}

function initSwagger(app: INestApplication, config: ConfigService) {
  const configSwagger = new DocumentBuilder()
    .setTitle(`${config.get('SERVICE_NAME')} microservice`)
    .setDescription('API Documentation')
    .addServer(`http://${config.get('HTTP_HOST')}:${config.get('HTTP_PORT')}`)
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup(`/docs`, app, document, {
    useGlobalPrefix: true,
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix(config.get('HTTP_PREFIX'));

  initKafka(app);
  initSwagger(app, config);

  await app.listen(config.get('HTTP_PORT'));
}

bootstrap();
