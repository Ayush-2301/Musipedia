import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "a3a9d2e173msh2ebaedc71a8e13cp145b85jsn7752eacd74cc"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopArtists: builder.query({
      query: () => "/charts/track",
    }),
    getBackgroundColor: builder.query({
      query: (artistId) => `/artists/get-details?id=${artistId}&l=en-US`,
    }),
    getShazamSearch: builder.query({
      query: (name) => `/search?term=${name}&locale=en-US&offset=0&limit=1`,
    }),
  }),
});
export const {
  useGetTopArtistsQuery,
  useGetBackgroundColorQuery,
  useGetShazamSearchQuery,
} = shazamCoreApi;
