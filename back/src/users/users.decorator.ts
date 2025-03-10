import { createParamDecorator } from "@nestjs/common";
import { Request } from "express";

export const UserSession = createParamDecorator((_, c) => {
	const request: Request = c.switchToHttp().getRequest()
	return request["user"]
})
