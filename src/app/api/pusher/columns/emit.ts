type Params = {
  member?: string;
  action: 'create' | 'edit' | 'delete';
  column: string;
  roomId: string;
  socketId: string;
};

export default async function emitColumns(data: Params): Promise<void> {
  const obj: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  obj.body = JSON.stringify({ ...data });

  await fetch('/api/pusher/columns', obj);
}
