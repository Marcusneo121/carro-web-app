"use client";

import { loginAction } from "@/lib/actions/auth_action";
import { login } from "@/services/auth";
import { ILoginJWTData } from "@/types/api_index";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FormEventHandler, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertAuthDialog } from "../components/AlertDialog";
import { LoadingDialog } from "../components/LoadingDialog";
import Link from "next/link";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import AuthPageHeader from "../components/AuthPageHeader";
import { DynamicAlertDialog } from "../components/DynamicAlertDialog";

const Login = () => {
  // const [formData, setFormData] = useState({
  //   username: "",
  //   password: "",
  // });

  // useEffect(() => {
  //   if (loginData === undefined) {
  //     console.log("Login Data is not yet define");
  //   } else {
  //     console.log(loginData);
  //   }
  // }, []);

  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openSpinner, setOpenSpinner] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginData, setloginData] = useState<ILoginJWTData>();
  const currentDate: Date = new Date();

  const [openErrorDynamicDialog, setOpenErrorDynamicDialog] =
    useState<boolean>(false);
  const [dialogErrorMessage, setDialogErrorMessage] = useState<string>("");
  const [dialogErrorTitle, setDialogErrorTitle] = useState<string>("");

  const dynamicErrorDialogSetter = (
    dialogTitle: string,
    dialogMessage: string,
    openDialog: boolean,
  ) => {
    setDialogErrorMessage(dialogMessage);
    setDialogErrorTitle(dialogTitle);
    setOpenErrorDynamicDialog(openDialog);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setOpenSpinner(true);
    try {
      const loginData: ILoginJWTData = await login({
        username: username.toString(),
        password: password.toString(),
      });

      console.log(loginData);

      setOpenSpinner(false);
      if (loginData.status === "ok") {
        console.log("come in ok");
        router.push("/");
      } else if (loginData.status === "error") {
        console.log("come in error");
        dynamicErrorDialogSetter(
          "Login failed",
          loginData.message.toString(),
          true,
        );
      } else {
        console.log("come in error else");
        dynamicErrorDialogSetter(
          "Login failed",
          "Something went wrong. Please try again.",
          true,
        );
      }

      // currentDate.getUTCFullYear().toLocaleString();
      // const checkToken = Cookies.get("JWT_TOKEN");
      // if (checkToken !== undefined) {
      //   setOpenSpinner(false);
      //   router.push("/");
      // }
      // alert(JSON.stringify(loginData));
    } catch (error) {
      // alert(error);
      setOpenSpinner(false);
      setOpenDialog(true);
    }
  };
  // h-[calc(100%-15%)]
  return (
    <div className="flex h-screen flex-col bg-brandprimary">
      <AuthPageHeader />

      <div className="flex h-full items-center justify-center">
        <div className="flex h-[600px] rounded-[30px] bg-white max-lg:h-[500px] ">
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
            <form onSubmit={handleSubmit} className="w-full px-10 max-lg:px-5">
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
                      onChange={(e) => {
                        setUsername(e.target.value.toString());
                      }}
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
                        onChange={(e) => {
                          setPassword(e.target.value.toString());
                        }}
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
                      <span className="font-extrabold">least 8 characters</span>
                      , include both{" "}
                      <span className="font-extrabold">
                        upper and lower case
                      </span>{" "}
                      letters, and a{" "}
                      <span className="font-extrabold">
                        number/special character
                      </span>
                      . Eg, Def8765#
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                  <Button
                    type="submit"
                    className="h-11 w-full rounded-full bg-specialyellow font-bold tracking-wider text-black hover:bg-specialyellowhover hover:font-extrabold"
                  >
                    LOGIN
                  </Button>
                  <LoadingDialog open={openSpinner} setOpen={setOpenSpinner} />
                  {/* <AlertAuthDialog open={openDialog} setOpen={setOpenDialog} /> */}
                  <DynamicAlertDialog
                    open={openErrorDynamicDialog}
                    setOpen={setOpenErrorDynamicDialog}
                    message={dialogErrorMessage}
                    title={dialogErrorTitle}
                  />
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
          </div>
        </div>
      </div>
    </div>
    // <div className="flex h-screen w-full items-center justify-center">
    //   <form onSubmit={handleSubmit}>
    //     <div className="flex h-full flex-col items-center justify-center gap-10">
    //       <input
    //         type="text"
    //         id="username"
    //         name="username"
    //         className="h-10 bg-slate-300"
    //         placeholder="username"
    //         onChange={(e) => {
    //           setUsername(e.target.value.toString());
    //         }}
    //       />
    //       <input
    //         type="text"
    //         id="password"
    //         name="password"
    //         className="h-10 bg-slate-300"
    //         placeholder="password"
    //         onChange={(e) => {
    //           setPassword(e.target.value.toString());
    //         }}
    //       />
    //       <button type="submit">LOGIN</button>
    //     </div>
    //   </form>
    // </div>
  );
};

export default Login;

//Try with server actions
// return (
//   <div>
//     <form action={loginAction}>
//       <div className="flex h-full flex-col items-center justify-center gap-10">
//         <input
//           type="text"
//           id="username"
//           name="username"
//           className="h-10 bg-slate-300"
//           placeholder="username"
//         />
//         <input
//           type="text"
//           id="password"
//           name="password"
//           className="h-10 bg-slate-300"
//           placeholder="password"
//         />
//         <button>LOGIN</button>
//       </div>
//     </form>
//   </div>
// );

{
  /* <input
                type="text"
                id="username"
                name="username"
                className="h-10 bg-slate-300"
                placeholder="username"
                onChange={(e) => {
                  setUsername(e.target.value.toString());
                }}
              /> */
}
{
  /* <input
                type="text"
                id="password"
                name="password"
                className="h-10 bg-slate-300"
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value.toString());
                }}
              /> */
}
{
  /* <button type="submit">LOGIN</button> */
}
