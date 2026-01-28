import { z } from "zod";

export const signupSchema = z
  .object({
    userId: z
      .string()
      .min(4, "4~16자리/영문, 숫자 사용 가능")
      .max(16, "4~16자리/영문, 숫자 사용 가능")
      .regex(/^[a-zA-Z0-9]+$/, "영문, 숫자만 사용 가능합니다"),
    password: z
      .string()
      .min(8, "8~16자리 영문 대소문자, 숫자, 특수문자 중 2가지 이상 조합")
      .max(16, "8~16자리 영문 대소문자, 숫자, 특수문자 중 2가지 이상 조합")
      .regex(
        /^(?=(.*[a-zA-Z].*)|(.*[0-9].*)|(.*[!@#$%^&*()].*))(?=(.*[a-zA-Z].*)|(.*[0-9].*)|(.*[!@#$%^&*()].*)).*$/,
        "2가지 이상 조합으로 만들어주세요",
      ),
    passwordConfirm: z.string(),
    name: z.string().min(1, "이름을 입력해주세요."),
    phone: z
      .string()
      .min(1, "휴대전화 번호를 입력해주세요.")
      .regex(/^\d+$/, "'-' 없이 숫자만 입력해주세요."),
    emailUser: z.string().min(1, "이메일을 입력해주세요."),
    emailDomain: z.string().min(1, "도메인을 입력해주세요."),
    termsService: z.boolean().refine((val) => val === true, {
      message: "필수 동의 항목입니다.",
    }),
    termsPrivacy: z.boolean().refine((val) => val === true, {
      message: "필수 동의 항목입니다.",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
