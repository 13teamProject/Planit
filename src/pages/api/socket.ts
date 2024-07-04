/* eslint-disable no-console */
import { Server as HTTPServer } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { Server as IOServer, Socket } from 'socket.io';

interface SocketServer extends HTTPServer {
  io?: IOServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket: any & {
    server: SocketServer;
  };
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket,
) {
  if (!res.socket.server.io) {
    console.log('Setting up Socket.io server...');
    const io = new IOServer(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket: Socket) => {
      socket.on('join-room', (room: string) => {
        socket.join(room);
      });

      socket.on('enter', (user: string, room: string) => {
        socket.to(room).emit('enter', user);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
  }

  res.end();
}
