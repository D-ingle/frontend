"use client";

import React from "react";

const ChangePassword = () => {
  return (
    <div className="flex-1 flex flex-col gap-5 w-240">
      {/* Card Container */}
      <div className="bg-white border-2 border-[#f0f0f0] rounded-xl p-15 flex flex-col gap-15">
        {/* Header Section */}
        <div className="flex flex-col gap-7 w-full">
          <div className="flex items-center">
            <h2 className="text-[28px] font-extrabold text-gray-800 leading-normal opacity-90 m-0 p-0">
              비밀번호 변경
            </h2>
          </div>
          {/* Divider */}
          <div className="h-px bg-[#D9D9D9] w-full" />
        </div>

        {/* Info Box */}
        <div className="bg-[#E8FBF6] rounded-[10px] px-4 py-5">
          <ul className="list-disc list-inside flex flex-col gap-0">
            <li className="text-[18px] font-semibold text-black leading-loose">
              8~16자리 영문 대소문자, 숫자, 특수문자 중 2가지 이상 조합으로
              만들어 주세요.
            </li>
            <li className="text-[18px] font-semibold text-black leading-loose">
              사용 가능한 특수기호: !@#$%^&*()-_=+[]&#123;&#125;/?&lt;&gt;,.
            </li>
          </ul>
        </div>

        {/* Form Section */}
        <form className="flex flex-col gap-10">
          {[
            { label: "현재 비밀번호", placeholder: "" },
            { label: "새 비밀번호", placeholder: "" },
            { label: "새 비밀번호 확인", placeholder: "" },
          ].map((item) => (
            <div key={item.label} className="flex gap-18 items-center w-full">
              <div className="w-40 flex items-start shrink-0">
                <span className="text-[20px] font-bold text-black leading-normal">
                  {item.label}
                </span>
              </div>

              <input
                type="password"
                className="w-100 h-12 border border-gray-300 rounded-md px-4 outline-none focus:border-main-400 transition-colors"
              />
            </div>
          ))}
        </form>
      </div>

      {/* Buttons Container */}
      <div className="flex justify-end gap-4 mt-5 w-full">
        <button
          type="button"
          className="w-54.75 h-15 bg-white border border-gray-300 text-black rounded-md text-[20px] font-bold flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          취소
        </button>
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

export default ChangePassword;
