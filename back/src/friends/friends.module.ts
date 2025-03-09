import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
	providers: [FriendsService],
	controllers: [FriendsController],
	imports: [
		UsersModule,
		PrismaModule,
	],
})
export class FriendsModule {}
