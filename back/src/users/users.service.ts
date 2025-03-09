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

	async findOne(username: string) {
		return await this.prisma.user.findUnique({
			where: {
				username: username
			}
		})
	}
}
