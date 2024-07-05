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

      socket.on('enter', (data) => {
        const { member, room } = data;

        socket.broadcast
          .to(room)
          .emit('enter', `${member} 님이 접속하였습니다.`);
      });

      socket.on('card', (data) => {
        const { member, action, card, room } = data;

        if (action === 'create') {
          socket.broadcast
            .to(room)
            .emit('card', `${member} 님이 ${card} 카드를 생성하였습니다.`);
        }

        if (action === 'edit') {
          socket.broadcast
            .to(room)
            .emit('card', `${member} 님이 ${card} 카드를 수정하였습니다.`);
        }

        if (action === 'delete') {
          socket.broadcast
            .to(room)
            .emit('card', `${member} 님이 ${card} 카드를 삭제하였습니다.`);
        }
      });

      socket.on('column', (data) => {
        const { member, action, column, room } = data;

        if (action === 'create') {
          socket.broadcast
            .to(room)
            .emit('column', `${member} 님이 ${column} 컬럼을 생성하였습니다.`);
        }

        if (action === 'edit') {
          socket.broadcast
            .to(room)
            .emit(
              'column',
              `${member} 님이 ${data.prevColumn} 컬럼을 ${column} 로 수정하였습니다.`,
            );
        }

        if (action === 'delete') {
          socket.broadcast
            .to(room)
            .emit('column', `${member} 님이 ${column} 컬럼을 삭제하였습니다.`);
        }
      });

      socket.on('dashboard', (data) => {
        const { member, action, room } = data;

        if (action === 'edit') {
          socket.broadcast
            .to(room)
            .emit(
              'dashboard',
              `${member} 님이 현재 대시보드를 ${data.dashboard} 로 수정하였습니다.`,
            );
        }

        if (action === 'delete') {
          socket.broadcast
            .to(room)
            .emit(
              'dashboard',
              `${member} 님이 현재 대시보드를 삭제하였습니다.`,
            );
        }
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
  }

  res.end();
}
