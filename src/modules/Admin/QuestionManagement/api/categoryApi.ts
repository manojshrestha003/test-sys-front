import { baseApi } from "@/app/store/baseApi";
import { apiRoutes } from "@/app/routes/apiRoutes";
import type{ CategoriesApiResponse } from "../types";



export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesApiResponse, void>({
      query: () => ({
        url: apiRoutes.getAllCategories,
        method: "GET",
        showToast: false,
      }),
      providesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;