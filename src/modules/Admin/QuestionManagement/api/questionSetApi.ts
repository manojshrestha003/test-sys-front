import { baseApi } from "@/app/store/baseApi";
import { apiRoutes } from "@/app/routes/apiRoutes";
import type {
  QuestionSetsApiResponse,
  CreateQuestionSetPayload,
} from "../types";

export const questionSetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuestionSets: builder.query<QuestionSetsApiResponse, void>({
      query: () => ({
        url: apiRoutes.getAllQuestionSet,
        method: "GET",
        showToast: false,
      }),
      providesTags: ["QuestionSet"],
    }),

    createQuestionSet: builder.mutation<unknown, CreateQuestionSetPayload>({
      query: (payload) => ({
        url: apiRoutes.createQuestionSet,
        method: "POST",
        body: payload,
        showToast: true,
        successMessage: "Question set created successfully.",
      }),
      invalidatesTags: ["QuestionSet"],
    }),

    updateQuestionSet: builder.mutation<
      unknown,
      { id: string; payload: CreateQuestionSetPayload }
    >({
      query: ({ id, payload }) => ({
        url: apiRoutes.updateQuestionSet.replace(":id", id),
        method: "PATCH",
        body: payload,
        showToast: true,
        successMessage: "Question set updated successfully.",
      }),
      invalidatesTags: ["QuestionSet"],
    }),

    deleteQuestionSet: builder.mutation<unknown, string>({
      query: (id) => ({
        url: apiRoutes.deleteQuestionSet.replace(":id", id),
        method: "DELETE",
        showToast: true,
        successMessage: "Question set deleted successfully.",
      }),
      invalidatesTags: ["QuestionSet"],
    }),

    deactivateQuestionSet: builder.mutation<unknown, { id: string; isActive: boolean }>({
      query: ({ id, isActive }) => ({
        url: apiRoutes.deactivateQuestionSet.replace(":id", id),
        method: "PATCH",
        body: { isActive },
        showToast: true,
        successMessage: isActive
          ? "Question set activated successfully."
          : "Question set deactivated successfully.",
      }),
      invalidatesTags: ["QuestionSet"],
    }),
  }),
});

export const {
  useGetQuestionSetsQuery,
  useCreateQuestionSetMutation,
  useUpdateQuestionSetMutation,
  useDeleteQuestionSetMutation,
  useDeactivateQuestionSetMutation
} = questionSetApi;
