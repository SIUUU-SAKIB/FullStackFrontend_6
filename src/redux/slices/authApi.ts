import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../services/baseQuery";


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: "user/create-user",
        method: "POST",
        body: user,
      }),
    }),
    createAdmin: builder.mutation({
      query: (user) => ({
        url: "user/create-admin",
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
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST"
      }),
    }),
    verify: builder.mutation({
      query: (payload) => ({
        url: 'user/verify-user',
        method: 'PATCH',
        body: payload
      })
    }),
    blockUser: builder.mutation({
      query: (payload) => ({
        url: 'user/block-user',
        method: 'PATCH',
        body: payload
      })
    }),
    unblockUser: builder.mutation({
      query: (payload) => ({
        url: 'user/unblock-user',
        method: 'PATCH',
        body: payload
      })
    }),
    deleteByAdmin: builder.mutation({
      query: (payload) => ({
        url: "user/delete-by-admin",
        method: "DELETE",
        body: payload
      })
    }),
    me: builder.query({
      query: () => "auth/me",
    }),
    alluser: builder.query({
      query: (page) => `user/all-users?page=${page}&limit=5`
    }),
    allAdmins: builder.query({
      query: () => "user/all-admins"
    })
  }),
});

export const { useRegisterMutation, useLoginMutation, useMeQuery, useLogoutMutation, useAlluserQuery, useVerifyMutation, useDeleteByAdminMutation, useBlockUserMutation, useUnblockUserMutation, useAllAdminsQuery, useCreateAdminMutation } = authApi;
