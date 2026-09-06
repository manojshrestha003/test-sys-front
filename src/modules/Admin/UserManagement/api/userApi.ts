import { baseApi } from "@/app/store/baseApi";
import { apiRoutes } from "@/app/routes/apiRoutes";

export type UserRole = "ADMIN" | "STUDENT";
export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UsersApiResponse {
  success: boolean;
  message: string;
  data: {
    users: User[];
  };
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersApiResponse, void>({
      query: () => ({
        url: apiRoutes.getAllUsers,
        method: "GET",
        showToast: false,
      }),
      providesTags: ["Auth"],
    }),
  }),
});

export const { useGetUsersQuery } = userApi;


