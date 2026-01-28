"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormValues } from "@/app/types/signup";
import { SignupInput } from "./SignupInput";
import SignupEmailInput from "./SignupEmailInput";
import { TermsCheckbox } from "./TermsCheckbox";
import { useRouter } from "next/navigation";
import { LucideEye, LucideEyeOff } from "lucide-react";

export const SignupForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const methods = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      userId: "",
      password: "",
      passwordConfirm: "",
      name: "",
      phone: "",
      emailUser: "",
      emailDomain: "",
      termsService: false,
      termsPrivacy: false,
    },
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    register,
  } = methods;

  const [isDomainManual, setIsDomainManual] = useState(true);

  const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "직접입력") {
      setIsDomainManual(true);
      setValue("emailDomain", "", { shouldValidate: true });
    } else {
      setIsDomainManual(false);
      setValue("emailDomain", value, { shouldValidate: true });
    }
  };

  const onSubmit = (data: SignupFormValues) => {
    console.log("Form Data:", data);
    // Handle signup logic here
    router.push("/signup/complete");
  };

  const termsService = watch("termsService");
  const termsPrivacy = watch("termsPrivacy");

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-16 w-full max-w-232.5 mx-auto pb-20"
      >
        <div className="flex flex-col gap-18">
          <SignupInput
            name="userId"
            label="아이디"
            required
            placeholder="4~16자리/영문, 숫자 사용 가능"
            error={errors.userId?.message}
          />

          <SignupInput
            name="password"
            label="비밀번호"
            type={showPassword ? "text" : "password"}
            required
            placeholder="8~16자리 영문 대소문자, 숫자, 특수문자 조합"
            error={errors.password?.message}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#9D9D9D]"
              >
                {showPassword ? (
                  <LucideEyeOff size={20} />
                ) : (
                  <LucideEye size={20} />
                )}
              </button>
            }
          />

          <SignupInput
            name="passwordConfirm"
            label="비밀번호 확인"
            type={showPasswordConfirm ? "text" : "password"}
            required
            placeholder="8~16자리 영문 대소문자, 숫자, 특수문자 조합"
            error={errors.passwordConfirm?.message}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className="text-[#9D9D9D]"
              >
                {showPasswordConfirm ? (
                  <LucideEyeOff size={20} />
                ) : (
                  <LucideEye size={20} />
                )}
              </button>
            }
          />

          <SignupInput
            name="name"
            label="이름"
            required
            placeholder="이름을 입력해주세요."
            error={errors.name?.message}
          />

          <SignupInput
            name="phone"
            label="휴대전화"
            required
            placeholder="'-' 없이 전화번호를 입력해주세요."
            error={errors.phone?.message}
          />

          {/* 이메일 섹션 */}
          <div className="grid grid-cols-[160px_1fr] w-full gap-18">
            <div className="flex items-center gap-1">
              <label className="text-[20px] font-bold text-[#222222]">
                이메일
              </label>
              <span className="text-[#FF0000]">*</span>
            </div>
            <div className="flex flex-row items-center gap-2.5">
              <SignupEmailInput
                register={register("emailUser")}
                placeholder="이메일"
                error={!!errors.emailUser}
              />
              <span className="text-[18px] font-medium text-[#c4c4c4]">@</span>
              <SignupEmailInput
                register={register("emailDomain")}
                placeholder="직접 입력"
                readOnly={!isDomainManual}
                error={!!errors.emailDomain}
              />
              <div className="relative w-40 h-12">
                <select
                  onChange={handleDomainChange}
                  className="w-50 h-full px-4 rounded-md border border-gray-300 outline-none appearance-none bg-white text-[18px] font-medium text-[#222222] cursor-pointer"
                >
                  <option value="직접입력">직접입력</option>
                  <option value="naver.com">naver.com</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="daum.net">daum.net</option>
                  <option value="hanmail.net">hanmail.net</option>
                  <option value="nate.com">nate.com</option>
                  <option value="yahoo.co.kr">yahoo.co.kr</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L6 6L11 1"
                      stroke="#555555"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-6 rounded-lg border border-[#D9D9D9] gap-2 mt-5.5">
          <TermsCheckbox
            id="termsService"
            checked={termsService}
            onChange={(val) =>
              setValue("termsService", val, { shouldValidate: true })
            }
            label={
              <span>
                <strong className="text-[#2EA98C] mr-1">[필수]</strong>
                디닷홈{" "}
                <strong className="font-bold">개인 정보 처리 방침</strong>을
                읽고 동의합니다.
              </span>
            }
          />
          <TermsCheckbox
            id="termsPrivacy"
            checked={termsPrivacy}
            onChange={(val) =>
              setValue("termsPrivacy", val, { shouldValidate: true })
            }
            label={
              <span>
                <strong className="text-[#2EA98C] mr-1">[필수]</strong>
                디닷홈 <strong className="font-bold">약관</strong>을 읽고 이를
                동의합니다.
              </span>
            }
          />
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={`w-55 h-15 rounded-md text-[20px] font-bold text-white transition-colors flex items-center justify-center ml-auto gap-2 ${
            isValid ? "bg-[#2EA98C] hover:bg-[#28957A]" : "bg-[#9D9D9D]"
          }`}
        >
          가입하기
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L7 7L1 13"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    </FormProvider>
  );
};
