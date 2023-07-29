import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "f87a6d998fmshd8133b5c75b9499p1dbe3bjsnb4ee3055d114"
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
      query: (name) => `/search?term=${name}&locale=en-US&offset=0&limit=5`,
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
