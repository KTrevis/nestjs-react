import { BadRequestException, Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from '@prisma/client';
import { MessagesService } from './messages.service';
import { UserSession } from 'src/users/users.decorator';
import { MessagesDto } from './messages.dto';

@Controller('messages')
export class MessagesController {
	constructor(private messagesService: MessagesService) {}

	@Post("create-group/:name")
	async createChatGroup(@UserSession() user: User, @Param("name") name: string) {
		name = name.trim()
		if (name.length < 3) {
			throw new BadRequestException("Group name must be at least 3 characters long.")
		}
		const group = await this.messagesService.createChatGroup(user, name)
		return {...group, message: "Chat group successfully created."}
	}

	@Get("groups")
	async getGroups(@UserSession() user: User) {
		return await this.messagesService.getGroups(user)
	}

	@Get(":groupName")
	async getGroupMessages(@Param("groupName") groupName: string) {
		return await this.messagesService.getGroupMessages(groupName)
	}

	@Post("send/:groupName")
	@UsePipes(new ValidationPipe())
	async sendMessage(@Body() body: MessagesDto, @UserSession() user: User, @Param("groupName") groupName: string) {
		const group = await this.messagesService.getGroup(groupName)
		await this.messagesService.sendMessage(body.message, user, group)
		return {message: "Message sent."}
	}
}
