import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
	const session: Record<string, any> = req.session
	let log = `${req.method} request at ${req.baseUrl}`

	// console.log(session.user)
	if (session.user)
		log += ` by ${session.user.username}`
	console.log(log)
	next();
  }
}
