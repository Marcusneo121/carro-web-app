import React from "react";
import AuthPageHeader from "../components/AuthPageHeader";
import Image from "next/image";
import PasswordInput from "./ui/PasswordInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import LoginNewForm from "./ui/LoginNewForm";

const LoginNew = () => {
  return (
    <div className="flex h-screen flex-col bg-brandprimary">
      <AuthPageHeader />

      <div className="flex h-full items-center justify-center">
        <div className="flex h-[600px] rounded-[30px] bg-white max-lg:h-[560px] ">
          <div className="relative w-[400px] max-lg:hidden">
            <Image
              alt="carro logo"
              src="/screenshots/phone-with-background-new.png"
              fill={true}
              objectFit="cover"
              className="rounded-bl-[30px] rounded-tl-[30px]"
            />
          </div>

          <div className="flex w-[400px] items-center justify-center max-md:w-[340px]">
            <LoginNewForm />
            {/* <PasswordInput
              {...register("confirmpassword")}
              name="confirmpassword"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginNew;
