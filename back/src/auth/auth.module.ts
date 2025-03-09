import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
	imports: [
		UsersModule,
		JwtModule.register({
			secret: "secret",
			signOptions: { expiresIn: "7d" }
		})
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
		AuthService
	],
	controllers: [AuthController],
	exports: [AuthService]
})
export class AuthModule {}
