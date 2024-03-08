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

    UploadAudio: builder.mutation({
      query: (audio) => ({
        url: "audio/create",
        method: "POST",
        body: audio,
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useVerifyEmailMutation,
  useSigninUserMutation,
  useUploadAudioMutation,
} = apiSlice;
