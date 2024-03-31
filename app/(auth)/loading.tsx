import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import AuthPageHeader from "./components/AuthPageHeader";

const loading = () => {
  return (
    <div className="flex h-screen flex-col bg-brandprimary">
      <AuthPageHeader />
      <div className="flex h-full items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin text-[100px] text-white" />
      </div>
    </div>
  );
};

export default loading;
