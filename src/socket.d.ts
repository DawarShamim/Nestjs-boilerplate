// socket.d.ts

import 'socket.io';

declare module 'socket.io' {
  interface Socket {
    token?: string; // Optional property to store token
    userEmail?: string; // Optional property to store user email
    userId?: string; // Optional property to store user ID
  }
}
