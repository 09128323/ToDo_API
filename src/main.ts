import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const PORT = process.env.PORT || 5123;
    const logger = new Logger('Bootstrap');
    let app;

    try {
        app = await NestFactory.create(AppModule);
        app.useGlobalPipes(new ValidationPipe());

        const config = new DocumentBuilder()
            .setTitle('API for Trello')
            .setDescription('Документация REST API для списка задач')
            .setVersion('1.0.0')
            .addBearerAuth(
                {
                  type: 'http',
                  scheme: 'bearer',
                  bearerFormat: 'JWT', 
                },
                'access-token' 
              )
            .build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('/api/docs', app, document);

        await app.listen(PORT);
        logger.log(`Server started on port ${PORT}`);
    } catch (error) {
        logger.error('Error starting server', error);
    }
}

bootstrap();
