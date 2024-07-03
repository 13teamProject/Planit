import { getCookie } from '@/utils/cookies';
import {
  Comment,
  CommentResponse,
  ErrorMessage,
  GetCommentRequest,
  PostCommentRequest,
  SuccessMessage,
} from '@planit-types';

import { API_URL } from './baseUrl';

// 댓글 리스트 불러오기
export async function getComments({
  cursorId,
  cardId,
  size = 5,
}: GetCommentRequest): Promise<CommentResponse | ErrorMessage> {
  const token = getCookie('accessToken');
  const params = new URLSearchParams({
    size: size.toString(),
    cardId: cardId.toString(),
  });

  if (cursorId && cursorId !== null) {
    params.append('cursorId', cursorId.toString());
  }
  const url = `${API_URL}/comments?${params}`;
  const obj: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  };

  try {
    const res = await fetch(url, obj);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }

    return {
      message: '댓글 데이터를 불러오는 중 알 수 없는 오류가 발생했습니다.',
    };
  }
}

// 댓글 삭제
export async function deleteComment(
  commentId: number,
): Promise<SuccessMessage | ErrorMessage> {
  const token = getCookie('accessToken');

  try {
    const res = await fetch(`${API_URL}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const data = await res.json();
      return { message: data.message };
    }

    return { success: true };
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }
    return { message: '댓글 삭제 중 알 수 없는 오류가 발생했습니다.' };
  }
}

// 댓글 작성
export async function postComment({
  content,
  cardId,
  columnId,
  dashboardId,
}: PostCommentRequest): Promise<Comment | ErrorMessage> {
  const token = getCookie('accessToken');

  const obj: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  obj.body = JSON.stringify({
    content,
    cardId,
    columnId,
    dashboardId,
  });

  try {
    const res = await fetch(`${API_URL}/comments`, obj);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }

    return { message: '댓글 포스팅 중 알 수 없는 오류가 발생했습니다.' };
  }
}

// 댓글 수정
export async function putComment(
  commentId: number,
  content: string,
): Promise<Comment | ErrorMessage> {
  const token = getCookie('accessToken');

  const obj: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  obj.body = JSON.stringify({
    content,
  });

  try {
    const res = await fetch(`${API_URL}/comments/${commentId}`, obj);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }

    return { message: '댓글 수정 중 알 수 없는 오류가 발생했습니다.' };
  }
}
