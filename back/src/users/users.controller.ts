import { Body, Controller, Get, HttpException, HttpStatus, Post, Session, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersCredentialsDto } from './users.dto';
import { UsersService } from './users.service';
import { Public } from 'src/auth/auth.decorator';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Post("register")
	@Public()
	@UsePipes(new ValidationPipe())
	async register(@Body() body: UsersCredentialsDto) {
		try {
			await this.usersService.createUser(body.username, body.password)
		} catch {
			const data = {message: ["This username is already taken."]}
			throw new HttpException(data, HttpStatus.FORBIDDEN)
		}

		return {message: ["Account succesfully created."]}
	}
}
