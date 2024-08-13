import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../services/users.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MyGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private usersService: UsersService) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.auth?.token;

    if (!token) {
      client.disconnect();
      console.log('Access Denied: No token provided');
      return;
    }

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_ENCRYPTION_KEY);
      client['userEmail'] = decoded.userEmail;
      client['userId'] = decoded.userId;

      console.log('User connected', client['userId']);
      
      // Update user status to online
      const userData = await this.usersService.setUserOnline(client['userId'], client.id);

      // Join rooms for each group
      userData?.user_groups?.forEach((groupId) => {
        client.join(groupId);
      });
    } catch (error) {
      console.log('Authentication error:', error.message);
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    console.log(`User disconnected: ${client.id}`);
    await this.usersService.setUserOffline(client['userId']);
  }

  @SubscribeMessage('emit-typing')
  async handleTyping(@MessageBody() data: { conversationId: string; recipient: string }, @ConnectedSocket() client: Socket) {
    if (!data.conversationId) {
      return;
    }
    try {
      const sendTo = await this.usersService.findUserById(data.recipient);

      if (sendTo && sendTo?.socketId) {
        this.server.to(sendTo?.socketId).emit('listen-typing', {
          conversationId: data.conversationId,
          sender: client['userId'],
          typing: true,
        });
      }
    } catch (error) {
      console.error('Error handling typing event:', error);
    }
  }
}
