import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsersService } from 'src/users/users.service';
import * as jwt from 'jsonwebtoken';
// import { SocketService } from './socket/socket.service';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;
  private socketLogger: Logger = new Logger('socket');
  constructor(
    private readonly userService: UsersService,
    // private readonly sessionService: SessionService,
  ) {}
  afterInit(server: Server) {
    this.socketLogger.log('Socket Server Initialzed');
    this.setupSocketMiddleware(server);
  }
  private setupSocketMiddleware(server: Server) {
    server.use((socket, next) => {
      const token = socket.handshake.auth?.token;
      if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded: any) => {
          if (err) {
            console.log(err);
          } else {
            // attaching user info to socket
            socket.token = token;
            socket.userEmail = decoded.email;
            socket.userId = decoded.userId;
            next();
          }
        });
      } else {
        next(new Error('Authentication error'));
      }
    });
  }

  // constructor(private readonly socketService: SocketService) {}
  handleConnection(socket: Socket): void {
    this.socketLogger.log(`client initialized ${socket.id}`);
    // this.socketService.handleConnection(socket);
  }

  handleDisconnect(socket: Socket): void {
    this.socketLogger.log(`client initialized ${socket.id}`);
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
