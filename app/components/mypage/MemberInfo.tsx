"use client";

import React from "react";
import { useUserStore } from "@/app/store/userStore";

const MemberInfo = () => {
  const { user } = useUserStore();

  const labels = [
    {
      key: "username",
      label: "이름",
      value: "김민지",
      editable: false,
    },
    { key: "id", label: "아이디", value: "Ddingle", editable: false },
    { key: "phone", label: "휴대전화", value: "01012345678", editable: true },
    {
      key: "email",
      label: "이메일",
      value: "Ddingle@dtonic.io",
      editable: true,
    },
  ];

  return (
    <div className="flex-1 flex flex-col gap-5 w-240">
      {/* Card Container */}
      <div className="bg-white border-2 border-[#f0f0f0] rounded-xl p-15 flex flex-col gap-15">
        {/* Header Section */}
        <div className="flex flex-col gap-7 w-full">
          <div className="flex items-center gap-5">
            <h2 className="text-[28px] font-extrabold text-gray-800 leading-normal opacity-90 m-0 p-0">
              회원정보
            </h2>
            <div className="flex items-center gap-2.5">
              <span className="text-red-500 font-bold text-[18px]">*</span>
              <span className="text-[#f17a7a] text-[20px] font-semibold leading-normal">
                필수 입력 항목
              </span>
            </div>
          </div>
          {/* Divider */}
          <div className="h-px bg-[#D9D9D9] w-full" />
        </div>

        <form className="flex flex-col gap-10">
          {labels.map((item) => (
            <div key={item.key} className="flex gap-18 items-center w-full">
              <div className="w-40 flex items-start gap-1.5 shrink-0">
                <span className="text-[20px] font-bold text-black leading-normal">
                  {item.label}
                </span>
                <span className="text-red-500 font-bold">*</span>
              </div>

              <div
                className={`w-172.5 h-12 flex items-center px-2.5 ${
                  !item.editable
                    ? "bg-gray-50 rounded-none"
                    : "bg-white border-b border-gray-300 border-solid"
                }`}
              >
                <input
                  type="text"
                  defaultValue={item.value}
                  readOnly={!item.editable}
                  className={`w-full bg-transparent outline-none text-[18px] font-medium leading-relaxed ${
                    !item.editable ? "text-gray-400" : "text-black opacity-80"
                  }`}
                />
              </div>
            </div>
          ))}
        </form>
      </div>

      {/* Save Button Container (Outside Card) */}
      <div className="flex justify-end pr-0 mt-10 w-full max-w-240 mx-auto mr-0">
        <button
          type="button"
          className="w-54.75 h-15 bg-navy text-white rounded-md text-[20px] font-bold flex items-center justify-center hover:opacity-90 transition-opacity"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default MemberInfo;
