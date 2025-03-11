import { Injectable } from '@nestjs/common';
import { ChatGroup, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesService {
	constructor(
		private prisma: PrismaService,
	) {}

	async sendMessage(message: string, sender: User, group: ChatGroup) {
		await this.prisma.message.create({
			data: {
				message: message,
				userId: sender.id,
				chatGroupId: group.id
			}
		})
	}

	async createChatGroup(creator: User, name: string) {
		const group = await this.prisma.chatGroup.create({
			data: {
				name: name,
				creatorId: creator.id,
			}
		})
		await this.prisma.chatGroupUsers.create({
			data: {
				chatGroupId: group.id,
				userId: creator.id
			}
		})
	}

	async addUserToGroup(user: User, group: ChatGroup) {
		await this.prisma.chatGroupUsers.create({
			data: {
				chatGroupId: group.id,
				userId: user.id
			}
		})
	}
}
