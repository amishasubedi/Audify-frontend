import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * This method registers all the api endpoints
 */
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),

  endpoints: (builder) => ({
    SignupUser: builder.mutation({
      query: (newUser) => ({
        url: "users/sign-up",
        method: "POST",
        body: newUser,
      }),
    }),

    VerifyEmail: builder.mutation({
      query: (user) => ({
        url: "users/verify",
        method: "POST",
        body: user,
      }),
    }),

    ReVerifyEmail: builder.mutation({
      query: (email) => ({
        url: "users/re-verify",
        method: "POST",
        body: email,
      }),
    }),

    SigninUser: builder.mutation({
      query: (user) => ({
        url: "users/sign-in",
        method: "POST",
        body: user,
      }),
    }),

    GetAllAudios: builder.query({
      query: () => "audio/",
      transformResponse: (response, meta, error) => {
        return response;
      },
    }),

    GetLatestUploads: builder.query({
      query: () => "audio/latest-uploads",
      transformResponse: (response, meta, error) => {
        return response;
      },
    }),
  }),
});

export const authApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("jsonwebtoken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    UploadAudio: builder.mutation({
      query: (audio) => ({
        url: "audio/create",
        method: "POST",
        body: audio,
      }),
    }),

    CreatePlaylist: builder.mutation({
      query: (playlist) => ({
        url: "playlist/create",
        method: "POST",
        body: playlist,
      }),
    }),

    IsAuth: builder.query({
      query: () => "users/is-auth",
      transformResponse: (response, meta, error) => {
        return response;
      },
    }),

    GetAllAudios: builder.query({
      query: () => "audio/",
      transformResponse: (response, meta, error) => {
        return response;
      },
    }),
  }),
});

export const {
  useSignupUserMutation,
  useVerifyEmailMutation,
  useSigninUserMutation,
} = apiSlice;

export const {
  useUploadAudioMutation,
  useIsAuthQuery,
  useGetAllAudiosQuery,
  useGetLatestUploadsQuery,
  useCreatePlaylistMutation,
} = authApiSlice;
