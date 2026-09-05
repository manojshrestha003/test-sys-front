import { baseApi } from "@/app/store/baseApi";
import type {
	RegisterRequest,
	RegisterResponse,
	VerifyEmailRequest,
	VerifyEmailResponse,
	LoginRequest,
	LoginResponse
} from "../types";
import { apiRoutes } from "@/app/routes/apiRoutes";

export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation<RegisterResponse, RegisterRequest>({
			query: (body) => ({
				url: apiRoutes.registerUser,
				method: "POST",
				body,
				showToast: true,
				successMessage: "OTP  sent to your email. Verify ",
			}),
		}),
		verifyEmail: builder.mutation<VerifyEmailResponse, VerifyEmailRequest>({
			query: (body) => ({
				url: apiRoutes.verifyOtp,
				method: "POST",
				body,
				showToast: true,
				successMessage: "Email verified successfully.",
			}),
		}),

		login: builder.mutation<LoginResponse, LoginRequest>({
			query: (body) => ({
				url: apiRoutes.login,
				method: "POST",
				body,
				showToast: true,
				successMessage: "User Logged in successfully",
			}),
		}),

	}),
});

export const { useRegisterMutation, useVerifyEmailMutation, useLoginMutation } = authApi;

