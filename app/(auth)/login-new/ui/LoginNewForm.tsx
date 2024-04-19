"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PasswordInput from "./PasswordInput";
import { ILoginJWTData } from "@/types/api_index";
import { checkHasCookie, loginServerActions } from "@/app/actions";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { login } from "@/services/auth";
import Cookies from "js-cookie";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const schema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type FormFields = z.infer<typeof schema>;

const LoginNewForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const getTokenCookies = Cookies.get("JWT_TOKEN");
  const getLoginDataCookies = Cookies.get("USER_LOGIN_DATA");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const loginData: ILoginJWTData = await login({
        username: data.username,
        password: data.password,
      });
      // await new Promise((resolve) => setTimeout(resolve, 30000));
      if (loginData.status === "ok") {
        if (Cookies.get("JWT_TOKEN") !== undefined) {
          const params = new URLSearchParams(searchParams);
          const protectFromRoute = params.get("protectfrom");

          if (protectFromRoute === null) {
            router.push("/");
          } else {
            console.log(protectFromRoute);
            console.log(pathname);
            router.push(`${protectFromRoute}`);
          }
        }
      } else if (loginData.status === "error") {
        setError("root", { message: loginData.message });
      } else {
        setError("root", {
          message: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setError("root", { message: "Something went wrong. Please try again." });
    }
  };

  useEffect(() => {
    if (getLoginDataCookies !== undefined && getTokenCookies !== undefined) {
      router.push("/");
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full px-10 max-lg:px-5"
    >
      <div className="flex flex-col gap-16">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex w-full flex-col gap-2">
            <h1 className="pl-1 text-lg font-bold">Username</h1>
            <input
              {...register("username")}
              type="text"
              id="username"
              name="username"
              className="signupInput"
            />
            <div className="ml-1 h-2">
              {errors?.username && (
                <p className="signUpError">{errors.username.message}</p>
              )}
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <h1 className="pl-1 text-lg font-bold">Password</h1>
            <PasswordInput {...register("password")} name="password" />
            <p className="pl-2 pr-4 text-xs text-smalltextbrandcolor">
              Your password must contain at{" "}
              <span className="font-extrabold">least 8 characters</span>,
              include both{" "}
              <span className="font-extrabold">upper and lower case</span>{" "}
              letters, and a{" "}
              <span className="font-extrabold">number/special character</span>.
              Eg, Def8765#
            </p>
            <div className="ml-1 h-2">
              {errors?.password && (
                <p className="signUpError">{errors.password.message}</p>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="h-7">
            {errors?.root && (
              <p className="signUpError">{errors.root.message}</p>
            )}
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full rounded-full bg-specialyellow pt-3 font-bold tracking-wider text-black hover:bg-specialyellowhover hover:font-extrabold"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <p className="">LOGGING IN</p>
                  <AiOutlineLoading3Quarters className="animate-spin text-[17px] text-black" />
                </div>
              ) : (
                "LOGIN"
              )}
            </Button>
            <div className="mt-2 flex flex-col items-center justify-center">
              <h3 className="text-sm font-bold">Don't have an account</h3>
              <Button
                asChild
                variant="link"
                className="cursor-pointer text-sm font-bold text-brandprimary hover:text-indigo-400"
              >
                <Link href="/signup">Sign up now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginNewForm;
