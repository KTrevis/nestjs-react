import { Body, Controller, Get, HttpException, HttpStatus, Post, Redirect, Req, Session, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersCredentialsDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
			   ) {}

	@Post("register")
	@UsePipes(new ValidationPipe())
	async register(@Body() body: UsersCredentialsDto) {
		try {
			await this.usersService.createUser(body.username, body.password)
		} catch {
			const data = {message: ["This username is already taken"]}
			throw new HttpException(data, HttpStatus.FORBIDDEN)
		}

		return {message: ["Account succesfully created."]}
	}

	@Post("login")
	async login(@Body() body: UsersCredentialsDto, @Session() session: Record<string, any>) {
		if (await this.usersService.login(body.username, body.password) == null) {
			throw new HttpException("Invalid credentials.", HttpStatus.UNAUTHORIZED)
		}
		session.authenticated = true
		return body
	}

	@Get("logout")
	@Redirect("/")
	logout(@Session() session: Record<string, any>) {
		session.authenticated = false
	}

	@Get("authenticated")
	async isLoggedIn(@Session() session: Record<string, any>) {
		return session.authenticated == true
	}
}
