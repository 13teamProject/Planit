type Params = {
  member: string;
  roomId: string;
  socketId: string;
};

export default async function enterRoom(data: Params): Promise<void> {
  const obj: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  obj.body = JSON.stringify({ ...data });

  await fetch('/api/pusher/enter', obj);
}
