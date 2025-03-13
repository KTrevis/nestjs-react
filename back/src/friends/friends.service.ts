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
				error += " The invitation is pending."
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
				recipientId: user.id,
				pending: true
			},
			include: {
				sender: true
			}
		})
		return invitations.map(invitation => invitation.sender.username)
	}

	async acceptRequest(recipient: User, sender: User) {
		const friendship = await this.prisma.friendship.findFirst({
			where: {
				sender: sender,
				recipient: recipient,
				pending: true
			}
		})

		if (friendship == null) {
			throw new NotFoundException("No pending friendship invitation found with this user.")
		}

		await this.prisma.friendship.update({
			where: {
				id: friendship.id
			},
			data: {
				pending: false,
			}
		})
		return {message: "Friend invitation accepted."}
	}

	async removeFriend(user: User, friend: User) {
		const friendship = await this.getFriendship(user.id, friend.id)

		if (friendship == null) {
			throw new NotFoundException("No friendship exists with this user.")
		}

		await this.prisma.friendship.delete({
			where: {
				id: friendship.id
			}
		})
		return {message: "Friendship successfully deleted."}
	}

	async getFriends(user: User) {
		const friendships = await this.prisma.friendship.findMany({
			where: {
				OR: [
					{ recipient: user },
					{ sender: user }
				],
				pending: false
			},
			include: {
				sender: true,
				recipient: true
			}
		})
		return friendships.map(friendship => {
			if (friendship.sender.username != user.username) {
				return friendship.sender.username
			}
			return friendship.recipient.username
		})
	}
}
