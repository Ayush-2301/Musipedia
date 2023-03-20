import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const geniusCoreApi = createApi({
  reducerPath: "geniusCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://genius-song-lyrics1.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-key",
        "f87a6d998fmshd8133b5c75b9499p1dbe3bjsnb4ee3055d114"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getGeniusSearch: builder.query({
      query: (name) => `/search/?q=${name}&per_page=1&page=1`,
    }),
    getGeniusTopCharts: builder.query({
      query: () =>
        `/chart/songs/?time_period=month&chart_genre=all&per_page=10&page=1`,
    }),
    getGeniusArtistData: builder.query({
      query: (artistId) => `/artist/details/?id=${artistId}`,
    }),
    getGeniusArtistTopSongs: builder.query({
      query: (artistId) => `/artist/songs/?id=${artistId}&per_page=6&page=1`,
    }),
    getGeniusArtistTopAlbums: builder.query({
      query: (artistId) => `/artist/albums/?id=${artistId}&per_page=6&page=1`,
    }),
    getGeniusSongData: builder.query({
      query: (songId) => `/song/details/?id=${songId}`,
    }),
    getGeniusSongLyrics: builder.query({
      query: (songId) => `/song/lyrics/?id=${songId}`,
    }),
    getGeniusAlbumData: builder.query({
      query: (albumID) =>
        `/album/appearances/?id=${albumID}&per_page=20&page=1`,
    }),
  }),
});
export const {
  useGetGeniusSearchQuery,
  useGetGeniusArtistDataQuery,
  useGetGeniusTopChartsQuery,
  useGetGeniusArtistTopSongsQuery,
  useGetGeniusArtistTopAlbumsQuery,
  useGetGeniusSongDataQuery,
  useGetGeniusSongLyricsQuery,
  useGetGeniusAlbumDataQuery,
} = geniusCoreApi;
