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
  const refreshResult = await rawBaseQuery(
    { url: "/auth/refresh", method: "POST" },
    api,
    extraOptions
  );

  if (refreshResult.data) {
    result = await rawBaseQuery(args, api, extraOptions);
  } else {
    api.dispatch({ type: "auth/logout" });
  }
}


  return result;
};
