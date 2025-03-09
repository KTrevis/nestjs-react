import { Body, Controller, Get, HttpException, HttpStatus, Post, Session, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersCredentialsDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Post("register")
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

	@Post("login")
	async login(@Body() body: UsersCredentialsDto, @Session() session: Record<string, any>) {
		const user = await this.usersService.login(body.username, body.password)
		if (user == null) {
			throw new HttpException("Invalid credentials.", HttpStatus.UNAUTHORIZED)
		}
		session.user = user
		return body
	}

	@Get("logout")
	logout(@Session() session: Record<string, any>) {
		session.user = undefined
	}

	@Get("authenticated")
	async isLoggedIn(@Session() session: Record<string, any>) {
		return session.user != undefined
	}
}
