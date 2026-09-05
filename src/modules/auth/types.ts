export interface RegisterRequest {
	name: string
	email: string
	password: string
}

export interface RegisterResponse {
	message?: string
	user?: unknown
}

export interface VerifyEmailRequest {
	email: string
	otp: string
}

export interface VerifyEmailResponse {
	message?: string
	user?: unknown
}

export interface LoginRequest {
	email: string
	password: string
}

export interface LoginUser {
	id: string
	name: string
	email: string
	role: string
	status: string
	emailVerified: boolean
	createdAt: string
}

export interface LoginResponse {
	success: boolean
	message: string
	data: {
		user: LoginUser
		token: string
	}
}