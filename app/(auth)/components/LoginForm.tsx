"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingDialog } from "../components/LoadingDialog";
import Link from "next/link";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { DynamicAlertDialog } from "../components/DynamicAlertDialog";
import { useState } from "react";
import { ILoginJWTData } from "@/types/api_index";
import {
  checkHasCookie,
  dummyServerActions,
  loginServerActions,
} from "@/app/actions";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { toast } from "react-hot-toast";
import { useFormStatus } from "react-dom";
import { revalidatePath } from "next/cache";
import { Span } from "next/dist/trace";
import { LoadingDialogRoot } from "@/app/components/LoadingDialogRoot";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [openSpinner, setOpenSpinner] = useState<boolean>(false);

  //   const [openErrorDynamicDialog, setOpenErrorDynamicDialog] =
  //     useState<boolean>(false);
  //   const [dialogErrorMessage, setDialogErrorMessage] = useState<string>("");
  //   const [dialogErrorTitle, setDialogErrorTitle] = useState<string>("");

  const cookies = useCookies();

  //   const { pending } = useFormStatus();

  //   const dynamicErrorDialogSetter = (
  //     dialogTitle: string,
  //     dialogMessage: string,
  //     openDialog: boolean,
  //   ) => {
  //     setDialogErrorMessage(dialogMessage);
  //     setDialogErrorTitle(dialogTitle);
  //     setOpenErrorDynamicDialog(openDialog);
  //   };

  //   const dynamicLoadingDialogSetter = (openDialog: boolean) => {
  //     setOpenSpinner(openDialog);
  //   };

  async function loginInServer(form: FormData) {
    // await dummyServerActions();

    // setOpenSpinner(true);
    try {
      const loginData: ILoginJWTData = await loginServerActions({
        username: form.get("username")?.toString(),
        password: form.get("password")?.toString(),
      });

      //   await new Promise((resolve) => setTimeout(resolve, 3000));

      if (loginData.status === "ok") {
        // const checkToken = await checkHasCookie("JWT_TOKEN");
        // console.log(checkToken);
        if ((await checkHasCookie("JWT_TOKEN")) === true) {
          //   setOpenSpinner(false);
          router.push("/");
        }
      } else if (loginData.status === "error") {
        toast.error(loginData.message ?? "Something went wrong");
        // console.log("come in error");
        // setOpenSpinner(false);
        // dynamicErrorDialogSetter(
        //   "Login failed",
        //   loginData.message.toString(),
        //   true,
        // );
      } else {
        toast.error("Something went wrong");
        // console.log("come in error else");
        // setOpenSpinner(false);
        // dynamicErrorDialogSetter(
        //   "Login failed",
        //   "Something went wrong. Please try again.",
        //   true,
        // );
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      //   setOpenSpinner(false);
      //   dynamicErrorDialogSetter(
      //     "Login failed",
      //     "Something went wrong. Please try again.",
      //     true,
      //   );
    }
  }

  return (
    <form action={loginInServer} className="w-full px-10 max-lg:px-5">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex w-full flex-col gap-2">
            <h1 className="pl-1 text-lg font-bold">Username</h1>
            <Input
              type="text"
              id="username"
              name="username"
              placeholder=""
              className="text-md h-12 rounded-xl border-2 focus:border-purple-200"
              required
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <h1 className="pl-1 text-lg font-bold">Password</h1>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder=""
                className="text-md h-12 rounded-xl border-2 tracking-wider focus:border-purple-200"
                required
              />
              <Button
                type="button"
                variant="ghost"
                className="absolute right-1 top-[7px] hover:bg-transparent"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <FiEyeOff className="text-xl text-gray-500" />
                ) : (
                  <FiEye className="text-xl text-gray-500" />
                )}
              </Button>
            </div>

            <p className="pl-2 pr-4 text-xs text-smalltextbrandcolor">
              Your password must contain at{" "}
              <span className="font-extrabold">least 8 characters</span>,
              include both{" "}
              <span className="font-extrabold">upper and lower case</span>{" "}
              letters, and a{" "}
              <span className="font-extrabold">number/special character</span>.
              Eg, Def8765#
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <Button
            type="submit"
            // disabled={pending}
            className="h-11 w-full rounded-full bg-specialyellow font-bold tracking-wider text-black hover:bg-specialyellowhover hover:font-extrabold"
          >
            LOGIN
          </Button>
          {/* <LoadingDialog open={openSpinner} setOpen={setOpenSpinner} /> */}
          {/* <LoadingDialogRoot /> */}
          {/* <AlertAuthDialog open={openDialog} setOpen={setOpenDialog} /> */}
          {/* <DynamicAlertDialog
            open={openErrorDynamicDialog}
            setOpen={setOpenErrorDynamicDialog}
            message={dialogErrorMessage}
            title={dialogErrorTitle}
          /> */}
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
    </form>
  );
}
