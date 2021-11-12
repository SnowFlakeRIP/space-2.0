import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors()
    app.use(cookieParser())
    await app.listen(process.env.PORT, () => {
        console.log(`server has been started on port:${process.env.PORT} `)
    });
}

bootstrap();
