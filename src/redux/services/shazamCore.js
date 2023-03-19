import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "ec3bdea89bmshf8fea54e0ff9220p16bd2ajsn3e807b3dcd2a"
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
    getShazamArtistTopSongs: builder.query({
      query: (artistId) => `/artists/get-top-songs?id=${artistId}&l=en-US`,
    }),
  }),
});
export const {
  useGetTopArtistsQuery,
  useGetBackgroundColorQuery,
  useGetShazamSearchQuery,
  useGetShazamArtistTopSongsQuery,
} = shazamCoreApi;
