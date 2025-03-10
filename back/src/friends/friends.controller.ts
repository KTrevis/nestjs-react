import { Controller, Delete, Get, NotFoundException, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { UserSession } from 'src/users/users.decorator';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Controller('friends')
export class FriendsController {
	constructor(
		private friendsService: FriendsService,
		private usersService: UsersService
	) {}

	@Post("invite/:username")
	sendInvitation(@UserSession() user: User, @Param("username") username: string) {
		return this.friendsService.sendInvitation(user, username)
	}

	@Get("requests-received")
	getRequestsReceived(@UserSession() user: User) {
		return this.friendsService.getRequestsReceived(user)
	}

	@Post(":username")
	async acceptRequest(@Param("username") username: string, @UserSession() user: User) {
		const sender = await this.usersService.findOne(username)

		if (sender == null) {
			throw new NotFoundException("No user with this username found.")
		}

		return await this.friendsService.acceptRequest(user, sender)
	}

	@Delete(":username")
	async removeFriend(@Param("username") username: string, @UserSession() user: User) {
		const friend = await this.usersService.findOne(username)

		if (friend == null) {
			throw new NotFoundException("No user with this username found.")
		}

		return await this.friendsService.removeFriend(user, friend)
	}

	@Get("")
	getFriends(@UserSession() user: User) {
		return this.friendsService.getFriends(user)
	}
}
