"use server";

import { loginSchema, type LoginFormValues } from "@/app/types/login";
import { login } from "@/shared/api/auth";
import { cookies } from "next/headers";

/**
 * 로그인 서버 액션
 * - 입력 데이터를 검증하고 서버에 로그인을 요청합니다.
 * - 성공 시 토큰을 안전한 쿠키에 저장합니다.
 */
export async function loginAction(data: LoginFormValues) {
  try {
    // 1. 데이터 검증
    const validatedData = loginSchema.parse(data);

    // 2. API 호출
    const response = await login({
      username: validatedData.userId,
      password: validatedData.password,
    });

    if (!response.success || !response.data) {
      return {
        success: false,
        message: response.error?.message || "로그인에 실패했습니다.",
      };
    }

    // 3. 토큰 쿠키 저장 (보안 설정 적용)
    const cookieStore = await cookies();

    // 액세스 토큰 저장
    cookieStore.set("accessToken", response.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1일
      path: "/",
    });

    // 리프레시 토큰 저장
    cookieStore.set("refreshToken", response.data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7일
      path: "/",
    });

    return {
      success: true,
      user: {
        userId: response.data.userId,
        username: response.data.username,
      },
    };
  } catch (error: unknown) {
    console.error("Login Action Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "서버 오류가 발생했습니다.";
    return {
      success: false,
      message: errorMessage,
    };
  }
}
