import { pusherServer } from '@/utils/pusher';

export async function POST(req: Request) {
  const { member, card, action, roomId, socketId } = await req.json();

  if (action === 'create') {
    pusherServer.trigger(
      String(roomId),
      'cards',
      `${member} 님이 ${card} 카드를 생성하였습니다.`,
      {
        socket_id: socketId,
      },
    );
  }

  if (action === 'edit') {
    pusherServer.trigger(
      String(roomId),
      'cards',
      `${member} 님이 ${card} 카드를 수정하였습니다.`,
      {
        socket_id: socketId,
      },
    );
  }

  if (action === 'delete') {
    pusherServer.trigger(
      String(roomId),
      'cards',
      `${member} 님이 ${card} 카드를 삭제하였습니다.`,
      {
        socket_id: socketId,
      },
    );
  }

  return new Response(JSON.stringify({ success: true }));
}
