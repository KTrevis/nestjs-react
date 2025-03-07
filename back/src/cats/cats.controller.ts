import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('cats')
export class CatsController {
	cats: {[key: string]: string} = {
		"miaou": "le miaou francais",
		"mew": "the english mew"
	}

	@Get()
	getAll(): string[] {
		return [...Object.keys(this.cats)]
	}

	@Get(":name")
	findOne(@Param("name") name: string): string {
		return this.cats[name]
	}

	@Post()
	createCat(@Res({passthrough: true}) res: Response, 
			  @Body("name") name: string, @Body("details") details: string): string {

		name = name.trim()
		details = details.trim()

		if (details == "" || name == "") {
			res.status(HttpStatus.UNAUTHORIZED)
			return "Details and name cannot be empty"
		}

		this.cats[name] = details
		return "Cat successfully created" 
	}
}
