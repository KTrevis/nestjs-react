import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddFriendDto } from './friends.dto';
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

	@Get("invite")
	@UsePipes(new ValidationPipe())
	sendInvitation(@UserSession() user: User, @Query() body: AddFriendDto) {
		return this.friendsService.sendInvitation(user, body.username)
	}
}
