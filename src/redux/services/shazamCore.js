import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "f87a6d998fmshd8133b5c75b9499p1dbe3bjsnb4ee3055d114",
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  },
};

fetch("https://shazam.p.rapidapi.com/charts/track", options)
  .then((response) => response.json())
  .catch((err) => console.error(err));
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
      query: ({ artistId }) => `/artists/get-details?id=${artistId}&l=en-US`,
    }),
  }),
});
export const { useGetTopArtistsQuery, useGetBackgroundColorQuery } =
  shazamCoreApi;
