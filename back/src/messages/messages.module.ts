import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MessagesGateway } from './messages.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [
		PrismaModule,
		AuthModule,
		JwtModule
	],
	providers: [MessagesService, MessagesGateway],
	controllers: [MessagesController],
})
export class MessagesModule {}
