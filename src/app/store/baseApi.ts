import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query"
import { toast } from "sonner"

type ToastQueryArgs = string | (FetchArgs & {
  showToast?: boolean
  successMessage?: string
  errorMessage?: string
})

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
})

const getErrorMessage = (error: FetchBaseQueryError) => {
  if ("data" in error && typeof error.data === "object" && error.data !== null) {
    const data = error.data as { message?: unknown }

    if (typeof data.message === "string") {
      return data.message
    }
  }

  if ("error" in error && typeof error.error === "string") {
    return error.error
  }

  return "Request failed. Please try again."
}

const baseQuery: BaseQueryFn<
  ToastQueryArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let requestArgs: string | FetchArgs = args
  let showToast = false
  let successMessage: string | undefined
  let errorMessage: string | undefined

  if (typeof args !== "string") {
    const {
      showToast: requestShowToast,
      successMessage: requestSuccessMessage,
      errorMessage: requestErrorMessage,
      ...request
    } = args

    requestArgs = request
    showToast = requestShowToast ?? false
    successMessage = requestSuccessMessage
    errorMessage = requestErrorMessage
  }

  const result = await rawBaseQuery(requestArgs, api, extraOptions)

  if (showToast) {
    if (result.error) {
      toast.error(errorMessage ?? getErrorMessage(result.error))
    } else {
      toast.success(successMessage ?? "Request completed successfully.")
    }
  }
  return result
}

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Auth"],
  endpoints: () => ({}),
})
