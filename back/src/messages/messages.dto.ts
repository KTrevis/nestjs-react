import { Transform } from "class-transformer"
import { IsNotEmpty, IsString } from "class-validator"

export class MessagesDto {
	@Transform(({value}) => value.trim())
	@IsString()
	@IsNotEmpty()
	message: string
}
