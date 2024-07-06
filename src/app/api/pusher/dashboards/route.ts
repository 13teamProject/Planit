import { pusherServer } from '@/utils/pusher';

export async function POST(req: Request) {
  const { member, dashboard, action, roomId, socketId } = await req.json();

  if (action === 'edit') {
    pusherServer.trigger(
      String(roomId),
      'dashboards',
      `${member} 님이 현재 대시보드를 ${dashboard} 로 수정하였습니다.`,
      {
        socket_id: socketId,
      },
    );
  }

  if (action === 'delete') {
    pusherServer.trigger(
      String(roomId),
      'dashboards',
      `${member} 님이 현재 대시보드를 삭제하였습니다.`,
      {
        socket_id: socketId,
      },
    );
  }

  return new Response(JSON.stringify({ success: true }));
}
