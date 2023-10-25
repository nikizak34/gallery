import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test-front.framework.team/",
  }),
  endpoints: (builder) => {
    return {
      getPainting: builder.query<PaintingDataType, GetPaintingRequest>({
        query: ({ currentPage = 1, find, authorId }) => {
          return `paintings?_page=${currentPage}&_limit=12&name_like=${find}&authorId=${authorId}`;
        },
      }),
      getPaintingFull: builder.query<any, any>({
        query: ({ find, authorId }) => {
          return `paintings?name_like=${find}&authorId=${authorId}`;
        },
      }),
      getAuthors: builder.query<AuthorsDataType, void>({
        query: () => `authors`,
      }),
      getLocation: builder.query<any, void>({
        query: () => `location`,
      }),
    };
  },
});

export const {
  useGetPaintingFullQuery,
  useGetPaintingQuery,
  useGetAuthorsQuery,
  useGetLocationQuery,
} = baseApi;

export type PaintingDataType = {
  data: PaintingType[];
};
export type PaintingType = {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
};

type GetPaintingRequest = {
  currentPage: number;
  find: string;
  authorId?: number;
};

export type AuthorsDataType = {
  data: AuthorsType[];
};
export type AuthorsType = {
  id: number;
  name: string;
};
