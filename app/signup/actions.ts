"use server";

import { signupSchema, type SignupFormValues } from "@/app/types/signup";
import { register } from "@/shared/api/generated/register-controller/register-controller";

/**
 * 회원가입 서버 액션
 * - 클라이언트에서 전달받은 데이터를 검증하고
 * - Orval로 생성된 register API를 서버 사이드에서 호출합니다.
 */
export async function signupAction(data: SignupFormValues) {
  try {
    // 1. 서버 사이드 데이터 검증
    const validatedData = signupSchema.parse(data);

    // 2. API 모델(UserDTO)로 변환
    // 백엔드 명세에 맞게 데이터를 매핑합니다.
    const userDTO = {
      userId: validatedData.userId,
      password: validatedData.password,
      username: validatedData.name,
      phone: validatedData.phone,
      email: `${validatedData.emailUser}@${validatedData.emailDomain}`,
      role: "USER" as const, // 기본 역할 설정
    };

    // 3. Orval API 호출
    const response = await register(userDTO);

    if (!response.success) {
      return {
        success: false,
        message: response.error?.message || "회원가입에 실패했습니다.",
      };
    }

    return { success: true };
  } catch (error: unknown) {
    console.error("Signup Action Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "서버 오류가 발생했습니다.";
    return {
      success: false,
      message: errorMessage,
    };
  }
}
