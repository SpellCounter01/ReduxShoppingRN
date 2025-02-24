import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category } from "../filter/filtersSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (build) => ({
    fetchCategories: build.query<Array<Category>, void>({
      query: () => "/products/categories",
    }),
  }),
});

export const { useFetchCategoriesQuery } = apiSlice;
