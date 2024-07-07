type Params = {
  member?: string;
  action: 'create' | 'edit' | 'delete';
  card: string;
  roomId: string;
  socketId: string;
};

export default async function emitCards(data: Params): Promise<void> {
  const obj: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  obj.body = JSON.stringify({ ...data });

  await fetch('/api/pusher/cards', obj);
}
