import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {

    const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder()
        .setTitle('Nest backend')
        .setDescription('Nest backend')
        .setVersion('1.0')
        .build();
    if(process.env.NODE_ENV === 'development') {
        app.enableCors();
    } else {
        app.enableCors();
    }

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);


    await app.listen(3000);
}

bootstrap();
