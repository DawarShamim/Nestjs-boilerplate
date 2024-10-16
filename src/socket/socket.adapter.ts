import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplicationContext } from '@nestjs/common';

export class SocketIoAdapter extends IoAdapter {
  constructor(private readonly app: INestApplicationContext) {
    super(app);
  }
  createIOServer(port: number, options?: any) {
    const server = super.createIOServer(port, options);
    return server;
  }
}
