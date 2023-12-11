import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test-front.framework.team/",
  }),
  endpoints: (builder) => {
    return {
      getPainting: builder.query<PaintingData, GetPaintingRequest>({
        query: ({
          currentPage = 1,
          search,
          authorId,
          locationId,
          fCreated,
          bCreated,
        }) => {
          return `paintings?_page=${currentPage}&_limit=12&name_like=${search}&authorId_like=${authorId}&locationId_like=${locationId}&created_gte=${fCreated}&created_lte=${bCreated}`;
        },
      }),
      getPaintingFullPage: builder.query<PaintingData, GetPaintingRequest>({
        query: ({ search, authorId, locationId, fCreated, bCreated }) => {
          return `paintings?name_like=${search}&authorId_like=${authorId}&locationId_like=${locationId}&created_gte=${fCreated}&created_lte=${bCreated}`;
        },
      }),
      getAuthors: builder.query<AuthorsData, void>({
        query: () => `authors`,
      }),
      getLocation: builder.query<LocationData, void>({
        query: () => `locations`,
      }),
    };
  },
});

export const {
  useGetPaintingFullPageQuery,
  useGetPaintingQuery,
  useGetAuthorsQuery,
  useGetLocationQuery,
} = baseApi;

export type PaintingData = {
  data: PaintingRequest[];
  isLoading: boolean;
};
export type PaintingRequest = {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
};

type GetPaintingRequest = {
  currentPage?: number;
  search?: string;
  authorId?: any;
  locationId?: any;
  fCreated?: string;
  bCreated?: string;
};

export type AuthorsData = {
  data: Authors[];
};
export type Authors = {
  id: number;
  name: string;
};

export type LocationData = {
  data: Location[];
};

export type Location = {
  id: number;
  location: string;
};
