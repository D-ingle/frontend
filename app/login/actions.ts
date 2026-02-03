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

    // 2. FormData 생성
    const formData = new FormData();
    formData.append("userId", validatedData.userId);
    formData.append("password", validatedData.password);

    // 3. API 호출
    const response = await login(formData);

    if (!response.success || !response.data) {
      return {
        success: false,
        message: response.error?.message || "로그인에 실패했습니다.",
      };
    }

    // 3. 토큰 쿠키 저장 (보안 설정 적용)
    const cookieStore = await cookies();

    // 액세스 토큰 저장
    cookieStore.set("accessToken", response.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1일
      path: "/",
    });

    return {
      success: true,
      user: {
        username: response.data.user.userName,
        preferredType: response.data.user.propertyType,
        preferredConditions: response.data.user.preferredConditions,
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

/**
 * 로그아웃 서버 액션
 * - 저장된 토큰 쿠키를 삭제합니다.
 */
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  return { success: true };
}
