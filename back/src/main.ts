import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from "cookie-parser"

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix("api")
	app.use(cookieParser())
	app.use(
		session({
			secret: "secret",
			resave: false,
			saveUninitialized: false,
		})
	)

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
