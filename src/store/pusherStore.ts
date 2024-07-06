import { pusherClient } from '@/utils/pusher';
import { create } from 'zustand';

type PusherState = {
  socketId: string | null;
  initializePusher: (dashboardId: string) => () => void;
};

export const usePusherStore = create<PusherState>((set) => ({
  socketId: null,
  initializePusher: (dashboardId: string) => {
    pusherClient.subscribe(dashboardId);

    pusherClient.connection.bind('connected', () => {
      set({ socketId: pusherClient.connection.socket_id });
    });

    return () => {
      pusherClient.unsubscribe(dashboardId);
    };
  },
}));
