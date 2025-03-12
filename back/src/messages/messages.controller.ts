import { BadRequestException, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { MessagesService } from './messages.service';
import { UserSession } from 'src/users/users.decorator';

@Controller('messages')
export class MessagesController {
	constructor(private messagesService: MessagesService) {}

	@Post("create-group/:name")
	async createChatGroup(@UserSession() user: User, @Param("name") name: string) {
		name = name.trim()
		if (name.length < 3) {
			throw new BadRequestException("Group name must be at least 3 characters long.")
		}
		await this.messagesService.createChatGroup(user, name)
		return {message: "Chat group successfully created."}
	}

	@Get("groups")
	async getGroups(@UserSession() user: User) {
		return await this.messagesService.getGroups(user)
	}
}
