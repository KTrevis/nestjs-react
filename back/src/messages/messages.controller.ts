import { Controller, Param, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { MessagesService } from './messages.service';
import { UserSession } from 'src/users/users.decorator';

@Controller('messages')
export class MessagesController {
	constructor(private messagesService: MessagesService) {}

	@Post("create-group/:name")
	async createChatGroup(@UserSession() user: User, @Param("name") name: string) {
		return name
	}
}
