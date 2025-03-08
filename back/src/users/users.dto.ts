import { IsString, MaxLength, MinLength } from "class-validator";

export class UsersCredentialsDto {
	@IsString()
	@MinLength(3, {message: "Username must be at least 3 characters long."})
	@MaxLength(10, {message: "Username cannot exceed 10 characters."})
	username: string

	@IsString()
	@MinLength(4, {message: "Password must at least 4 characters long."})
	password: string
}
