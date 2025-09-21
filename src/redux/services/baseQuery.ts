import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include"
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  console.log('Request args:', args);

  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log('401 error received, attempting to refresh token...');

    const refreshResult = await rawBaseQuery("auth/refresh", api, extraOptions);

    if (refreshResult.data) {

      console.log('Token refresh successful, retrying original request...');

      result = await rawBaseQuery(args, api, extraOptions);
    } else {

      console.log('Refresh failed, logging out...');

      api.dispatch({ type: "auth/logout" });
    }
  }

  return result;
};
