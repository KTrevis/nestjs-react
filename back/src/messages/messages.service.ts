import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ChatGroup, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessagesGateway } from './messages.gateway';

@Injectable()
export class MessagesService {
	constructor(
		private prisma: PrismaService,
		private gateway: MessagesGateway
	) {}

	async sendMessage(message: string, sender: User, group: ChatGroup) {
		this.gateway.sendMessageToGroup(group.name, message, sender.username)
		await this.prisma.message.create({
			data: {
				message: message,
				userId: sender.id,
				chatGroupId: group.id
			}
		})
	}

	async createChatGroup(creator: User, name: string) {
		let group: {
			name: string
			id: number
			creatorId: number
		}

		try {
			group = await this.prisma.chatGroup.create({
				data: {
					name: name,
					creatorId: creator.id,
				}
			})
		} catch {
			throw new ConflictException("A group with this name already exists.")
		}

		await this.prisma.chatGroupUsers.create({
			data: {
				chatGroupId: group.id,
				creatorId: creator.id
			}
		})
		return {
			id: group.id,
			name: group.name
		}
	}

	async addUserToGroup(user: User, group: ChatGroup) {
		await this.prisma.chatGroupUsers.create({
			data: {
				chatGroupId: group.id,
				creatorId: user.id
			}
		})
	}

	async getGroups(user: User) {
		const res = await this.prisma.user.findUnique({
			where: {
				username: user.username
			},
			include: {
				joinedGroups: {
					include: {
						chatGroup: true
					}
				}
			}
		})

		if (res == null) {
			return []
		}
		return res.joinedGroups.map(group => {
			return {
				name: group.chatGroup.name,
				id: group.chatGroup.id,
			}
		})
	}

	async getGroupMessages(groupName: string) {
		const group = await this.prisma.chatGroup.findUnique({
			where: {
				name: groupName
			},
			include: {
				messages: {
					include: {
						user: true
					}
				}
			}
		})

		if (group == null) {
			throw new NotFoundException("No group with this name has been found.")
		}
		return group.messages.map(message => {
			return {
				message: message.message,
				from: message.user.username
			}
		})
	}

	async getGroup(groupName: string) {
		const group = await this.prisma.chatGroup.findUnique({
			where: {
				name: groupName
			}
		})

		if (group == null) {
			throw new NotFoundException("No group with this name has been found.")
		}
		return group
	}
}
