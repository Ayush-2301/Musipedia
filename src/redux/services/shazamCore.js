import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "255e515f27msh41ac6839c3e9f4dp1948fejsn7abe8b13ea98"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopArtists: builder.query({
      query: () => "/charts/track",
    }),
    getBackgroundColor: builder.query({
      query: ({ artistId }) => `/artists/get-details?id=${artistId}&l=en-US`,
    }),
  }),
});
export const { useGetTopArtistsQuery, useGetBackgroundColorQuery } =
  shazamCoreApi;
