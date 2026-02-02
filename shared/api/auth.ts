import { customInstance } from "./axios-instance";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import type { ErrorType } from "./axios-instance";

/**
 * 로그인 요청 데이터 타입
 */
export interface LoginRequest {
  username: string;
  password?: string;
}

/**
 * 로그인 응답 데이터 타입
 */
export interface LoginResponse {
  success: boolean;
  data?: {
    accessToken: string;
    refreshToken: string;
    userId: string;
    username: string;
  };
  error?: {
    message: string;
  };
}

/**
 * 로그인 API 함수 (POST /api/v1/auth/login)
 */
export const login = (data: FormData) => {
  return customInstance<LoginResponse>({
    url: "/login",
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    data,
  });
};

/**
 * 로그인 Mutation 훅
 */
export const useLogin = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof login>>,
    TError,
    { data: FormData },
    TContext
  >;
}) => {
  const { mutation: mutationOptions } = options ?? {};

  return useMutation({
    mutationFn: ({ data }) => login(data),
    ...mutationOptions,
  });
};
