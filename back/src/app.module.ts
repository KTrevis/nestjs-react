import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [UsersModule, PrismaModule, FriendsModule],
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
