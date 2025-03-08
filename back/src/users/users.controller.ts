import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersCredentialsDto } from './users.dto';

@Controller('users')
export class UsersController {
	@Post("register")
	@UsePipes(new ValidationPipe())
	register(@Body() body: UsersCredentialsDto) {
		console.log(body)
		return {message: "Account succesfully created"}
	}
}
