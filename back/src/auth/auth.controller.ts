import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersCredentialsDto } from 'src/users/users.dto';
import { Public } from './auth.decorator';
import { UserSession } from 'src/users/users.decorator';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@Post("login")
	@UsePipes(new ValidationPipe())
	login(@Body() body: UsersCredentialsDto) {
		return this.authService.login(body.username, body.password)
	}

	@Get("status")
	status(@UserSession() user: User) {
		return {
			username: user.username
		}
	}
}
