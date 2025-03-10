// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   friends.service.ts                                 :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: ketrevis <ketrevis@student.42.fr>          +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2025/03/10 10:15:00 by ketrevis          #+#    #+#             //
//   Updated: 2025/03/10 10:32:10 by ketrevis         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FriendsService {
	constructor(
		private usersService: UsersService,
		private prisma: PrismaService,
	) {}

	async getFriendship(user1: number, user2: number) {
		const friendship = await this.prisma.friendship.findFirst({
			where: {
				senderId: user1,
				recipientId: user2
			}
		})

		if (friendship != null) {
			return friendship
		}

		return await this.prisma.friendship.findFirst({
			where: {
				senderId: user2,
				recipientId: user1,
			}
		})
	}

	async sendInvitation(sender: User, username: string) {
		if (sender.username == username) {
			throw new ForbiddenException("You cannot add yourself to your friends.")
		}

		const recipient = await this.usersService.findOne(username)

		if (recipient == null) {
			throw new NotFoundException("No user with this username found.")
		}
		const friendship = await this.getFriendship(sender.id, recipient.id)

		if (friendship != null) {
			let error = "This friendship already exists."

			if (friendship.pending) {
				error += " An invitation is pending."
			}
			throw new ConflictException(error)
		}

		await this.prisma.friendship.create({
			data: {
				senderId: sender.id,
				recipientId: recipient.id
			}
		})
		return { message: "Invitation sent." }
	}

	async getRequestsReceived(user: User) {
		const invitations = await this.prisma.friendship.findMany({
			where: {
				recipientId: user.id
			},
			include: {
				sender: true
			}
		})
		return Array.from(invitations, (invitation) => invitation.sender.username)
	}
}
