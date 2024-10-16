import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
// import { SocketService } from './socket/socket.service';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;

  // constructor(private readonly socketService: SocketService) {}
  handleConnection(socket: Socket): void {
    console.log(`client initialized ${socket.id}`);
    // this.socketService.handleConnection(socket);
  }
  // Implement other Socket.IO event handlers and message handlers
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): void {
    this.server.emit('msgToClient', text);
  }

  emitEvent(event: string, data: any): void {
    this.server.emit(event, data);
  }
}
