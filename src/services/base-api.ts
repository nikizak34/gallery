import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test-front.framework.team/",
  }),
  endpoints: (builder) => {
    return {
      getPainting: builder.query<PaintingDataType, GetPaintingRequest>({
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
      getPaintingFull: builder.query<PaintingDataType, GetPaintingRequest>({
        query: ({ search, authorId, locationId, fCreated, bCreated }) => {
          return `paintings?name_like=${search}&authorId_like=${authorId}&locationId_like=${locationId}&created_gte=${fCreated}&created_lte=${bCreated}`;
        },
      }),
      getAuthors: builder.query<AuthorsDataType, void>({
        query: () => `authors`,
      }),
      getLocation: builder.query<LocationDataType, void>({
        query: () => `locations`,
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
  isLoading: boolean;
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
  currentPage?: number;
  search?: string;
  authorId?: any;
  locationId?: any;
  fCreated?: string;
  bCreated?: string;
};

export type AuthorsDataType = {
  data: AuthorsType[];
};
export type AuthorsType = {
  id: number;
  name: string;
};

export type LocationDataType = {
  data: LocationType[];
};

export type LocationType = {
  id: number;
  location: string;
};
