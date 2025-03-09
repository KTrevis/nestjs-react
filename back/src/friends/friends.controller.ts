import { Body, Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddFriendDto } from './friends.dto';

@Controller('friends')
export class FriendsController {
	@Get("add")
	@UsePipes(new ValidationPipe())
	addFriend(@Query() body: AddFriendDto) {
		console.log(body)
		return body
	}
}
