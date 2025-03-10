import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from './auth.decorator';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private jwtService: JwtService, private reflector: Reflector) {}

	private routeIsPublic(context: ExecutionContext): boolean {
		return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(), context.getClass()
		])
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		if (this.routeIsPublic(context)) {
			return true
		}

		const request: Request = context.switchToHttp().getRequest()
		const token = request.cookies?.jwt

		if (!token) {
			throw new UnauthorizedException()
		}

		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: "secret"
			})
			request["user"] = {
				id: payload.sub,
				username: payload.username
			}
		} catch {
			throw new UnauthorizedException()
		}

		return true
	}
}
