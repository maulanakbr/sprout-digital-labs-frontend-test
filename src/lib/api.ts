import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { transformResponse } from '@/lib/utils';

export const apiBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  responseHandler: async (response) => {
    const json = await response.json();
    return transformResponse(json);
  },
});
