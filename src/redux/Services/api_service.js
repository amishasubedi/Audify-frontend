import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * This method registers all the api endpoints
 */
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.BASE_URL}` }),

  endpoints: (builder) => ({
    SignupUser: builder.mutation({
      query: (newUser) => ({
        url: "users/sign-up",
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});

export const { useSignupUserMutation } = apiSlice;
