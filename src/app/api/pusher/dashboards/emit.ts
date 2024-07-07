type Params = {
  member?: string;
  action: 'edit' | 'delete';
  dashboard?: string;
  roomId: string;
  socketId: string;
};

export default async function emitDashboards(data: Params): Promise<void> {
  const obj: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  obj.body = JSON.stringify({ ...data });

  await fetch('/api/pusher/dashboards', obj);
}
