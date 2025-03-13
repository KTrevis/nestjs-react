import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from './auth.decorator';
import { Request } from 'express';

function cookieToMap(cookie: string) {
	const split = cookie.split(";")
	const map = {}

	split.forEach(str => {
		const split = str.split("=")

		if (split.length != 2) {
			return
		}
		const key = split[0]
		const value = split[1]
		map[key] = value
	})
	return map
}

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
		let token: string | undefined = request.cookies?.jwt
		// @ts-ignore
		const wsCookies: string | undefined = request.handshake?.headers.cookie

		if (wsCookies) {
			token = cookieToMap(wsCookies)["jwt"]
		}

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
