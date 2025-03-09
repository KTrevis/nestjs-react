import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [UsersModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(LoggerMiddleware)
			.forRoutes("*")
	}
}
