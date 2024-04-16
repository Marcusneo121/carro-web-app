"use client";

import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const error = () => {
  return (
    <div className="flex min-h-[800px] flex-col bg-white">
      <div className="mt-[300px] flex h-full items-center justify-center">
        Something went wrong! Please try again.
      </div>
    </div>
  );
};

export default error;