// socket.d.ts

declare module 'socket.io' {
  interface Socket {
    token?: string;
    userEmail?: string;
    userId?: string;
  }
}
