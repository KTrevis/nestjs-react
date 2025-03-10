import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async login(username: string, password: string) {
		const user = await this.usersService.findOne(username)

		if (user == null || await compare(password, user.password) == false) {
			throw new UnauthorizedException("Invalid credentials.")
		}

		const payload = { sub: user.id, username: user.username }

		return {
			access_token: await this.jwtService.signAsync(payload)
		}
	}
}
