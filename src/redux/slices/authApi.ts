import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../services/baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery:baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: "user/create-user",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    me: builder.query({
      query: () => "auth/me",
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useMeQuery } = authApi;
