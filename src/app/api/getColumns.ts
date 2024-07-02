import { getCookie } from '@/utils/cookies';

import { API_URL } from './baseUrl';

export type Column = {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
};

export type ColumnsResponse = {
  result: string;
  data: Column[];
};

type GetColumnsParams = {
  dashboardId: number;
};
