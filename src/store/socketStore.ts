import { Socket, io } from 'socket.io-client';
import { create } from 'zustand';

type SocketState = {
  socket: Socket | null;
  setSocket: (newSocket: Socket) => void;
  initializeSocket: (dashboardId: string) => Promise<() => void>;
};

export const useSocketStore = create<SocketState>((set) => ({
  socket: null,
  setSocket: (newSocket) => set({ socket: newSocket }),
  initializeSocket: async (dashboardId: string) => {
    await fetch('/api/socket');

    const newSocket = io();

    newSocket.on('connect', () => {
      newSocket.emit('join-room', dashboardId);
    });

    set({ socket: newSocket });

    return () => {
      newSocket.disconnect();
    };
  },
}));
