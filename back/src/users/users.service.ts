import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { compare, genSalt, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async createUser(username: string, password: string) {
		const salt = await genSalt()
		password = await hash(password, salt)

		await this.prisma.user.create({
			data: {username, password}
		})
	}

	async login(username: string, password: string): Promise<User | null> {
		const user = await this.findUser(username)
		
		if (user == null) {
			return null
		}

		const hashed = user.password

		if (await compare(password, hashed) == true)
			return user
		return null
	}

	async findUser(username: string) {
		return await this.prisma.user.findUnique({
			where: {
				username: username
			}
		})
	}
}
