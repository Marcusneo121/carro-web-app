import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import AuthPageHeader from "../(auth)/components/AuthPageHeader";

const loading = () => {
  return (
    <div className="flex min-h-[800px] flex-col bg-white">
      <div className="mt-[300px] flex h-full items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin text-[100px] text-brandprimary" />
      </div>
    </div>
  );
};

export default loading;
