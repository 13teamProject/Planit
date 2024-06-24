const BASE_URL = 'https://sp-taskify-api.vercel.app/6-13';

// GET API Layer
async function GET(URL: string): Promise<any> {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error('Failed to get data : ', error);
    throw error;
  }
}

// GET
export async function getDashboard(teamId: number): Promise<any> {
  return await GET(`${BASE_URL}/${teamId}/dashboards`);
}

// POST API Layer
export async function POST(
  URL: string,
  formData: Record<string, any>,
): Promise<any> {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // JSON 데이터를 보내는 경우
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error('Failed to post data : ', error);
    throw error;
  }
}

// POST
export async function postPaper(formData: Record<string, any>): Promise<any> {
  const fetchData = await POST(`${BASE_URL}/recipients/`, formData);
  return fetchData;
}
