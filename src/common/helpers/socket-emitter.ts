import { Server } from 'socket.io';

export function socketEventEmitter(
  server: Server,
  eventName: string,
  socketId: string,
  data: any,
) {
  if (server) {
    console.log('Emitting event');
    server.to(socketId).emit(eventName, data);
  } else {
    console.error('Socket server is not initialized.');
  }
}
  