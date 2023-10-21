import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test-front.framework.team/",
  }),
  endpoints: (builder) => {
    return {
      getPainting: builder.query<any, number>({
        query: (page = 1) => `paintings?_page=${page}&_limit=12`,
      }),
      getAuthors: builder.query<any, void>({
        query: () => `authors`,
      }),
      getLocation: builder.query<any, void>({
        query: () => `location`,
      }),
    };
  },
});

export const { useGetPaintingQuery, useGetAuthorsQuery, useGetLocationQuery } =
  baseApi;

export type PaintingType = {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
};
