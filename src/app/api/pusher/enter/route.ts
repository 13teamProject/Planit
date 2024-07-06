import { pusherServer } from '@/utils/pusher';

export async function POST(req: Request) {
  const { member, roomId, socketId } = await req.json();

  pusherServer.trigger(
    String(roomId),
    'enter',
    `${member} 님이 접속하였습니다.`,
    {
      socket_id: socketId,
    },
  );

  return new Response(JSON.stringify({ success: true }));
}
