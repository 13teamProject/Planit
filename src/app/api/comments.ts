import { getCookie } from '@/utils/cookies';
import {
  Comment,
  CommentResponse,
  GetCommentRequest,
  PostCommentRequest,
} from '@planit-types';

import { API_URL } from './baseUrl';

// 댓글 리스트 불러오기
export async function getComments({
  cursorId,
  cardId,
  size = 5,
}: GetCommentRequest): Promise<CommentResponse> {
  const token = getCookie('accessToken');
  const params = new URLSearchParams({
    size: size.toString(),
    cardId: cardId.toString(),
  });

  if (cursorId && cursorId !== null) {
    params.append('cursorId', cursorId.toString());
  }

  const url = `${API_URL}/comments?${params}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    throw new Error('데이터를 받는 중에 오류가 발생했습니다.');
  }
}

// 댓글 삭제
export async function deleteComment(commentId: number): Promise<string | null> {
  const token = getCookie('accessToken');

  try {
    const res = await fetch(`${API_URL}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 204) {
      alert('댓글이 삭제되었습니다.');
      return null;
    }

    if (!res.ok) {
      const errorData = await res.json();
      return errorData.message || `HTTP error! status: ${res.status}`;
    }
    return null;
  } catch (err) {
    return '데이터를 삭제하는 중에 오류가 발생했습니다.';
  }
}

// 댓글 작성
export async function postComment({
  content,
  cardId,
  columnId,
  dashboardId,
}: PostCommentRequest): Promise<Comment> {
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

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    throw new Error('데이터를 받는 중에 오류가 발생했습니다.');
  }
}

// 댓글 수정
export async function putComment(
  commentId: number,
  content: string,
): Promise<Comment> {
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

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    throw new Error('데이터를 수정하는 중에 오류가 발생했습니다.');
  }
}
