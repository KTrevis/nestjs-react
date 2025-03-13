import { UseGuards } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { User } from '@prisma/client';
import {Server, Socket} from "socket.io"
import { AuthGuard } from 'src/auth/auth.guard';
import { UserSession } from 'src/users/users.decorator';

@WebSocketGateway({
	path: "/api/chat",
})
export class MessagesGateway {
	@WebSocketServer()
	server: Server

	@UseGuards(AuthGuard)
	@SubscribeMessage("join-group")
	joinGroup(
		@MessageBody("group") group: string,
		@ConnectedSocket() client: Socket
	) {
		client.rooms.forEach(room => {
			client.leave(room)
		})
		client.join(group)
		client.emit("message", {message: `Joined ${group} group.`})
	}

	@UseGuards(AuthGuard)
	sendMessageToGroup(group: string, message: string, from: string) {
		this.server.to(group).emit("new-message", {from, message})
	}
}
