const BASE_URL = 'https://sp-taskify-api.vercel.app/6-13';
export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

type DashboardResponse = {
  cursorId: number;
  totalCount: number;
  dashboards: Array<{
    id: number;
    title: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    createdByMe: boolean;
    userId: number;
  }>;
};

type ApiError = {
  message: string;
  status: number;
};

// GET API Layer
async function GET<T>(URL: string): Promise<T> {
  try {
    const response = await fetch(URL, {
      headers: { Authorization: `Bearer ${12345}` }, // 사용할 토큰을 헤더에 설정
    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body: T = await response.json();
    return body;
  } catch (error) {
    console.error('Failed to get data : ', error);
    throw error;
  }
}

export async function getDashboards(): Promise<DashboardResponse> {
  return await GET<DashboardResponse>(
    `${BASE_URL}/dashboards?navigationMethod=infiniteScroll&page=1&size=10`,
  );
}

// POST API Layer
async function POST<T>(URL: string, formData: Record<string, any>): Promise<T> {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body: T = await response.json();
    return body;
  } catch (error) {
    console.error('Failed to post data : ', error);
    throw error;
  }
}

export async function postDashboards(
  formData: Record<string, any>,
): Promise<DashboardResponse> {
  return await POST<DashboardResponse>(`${BASE_URL}/dashboards`, formData);
}
