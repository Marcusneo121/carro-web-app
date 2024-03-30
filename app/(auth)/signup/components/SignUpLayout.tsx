"use client";

import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IEmailUsernameCheckProps,
  IRegisterProps,
  ISignUpProps,
} from "@/types/api_index";
import { checkEmail, checkUsername, userRegister } from "@/services/auth";
import debounce from "lodash.debounce";
import { LoadingDialog } from "../../components/LoadingDialog";
import { DynamicAlertDialog } from "../../components/DynamicAlertDialog";
import { DynamicDialogMessages } from "../../components/DynamicDialogMessage";
import { ageFromDateOfBirthday } from "@/utils/utils";
import { RegisterDataUIProps } from "@/types";

const regexUsernamePassword: RegExp = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
);

const schema = z
  .object({
    username: z
      .string()
      .min(1, { message: "Username is required" })
      .regex(regexUsernamePassword, {
        message: "Username format incorrect.",
      }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Email format incorrect." }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .regex(regexUsernamePassword, {
        message: "Passwword format incorrect",
      }),
    confirmpassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
    firstname: z.string().min(1, { message: "First name is required" }),
    lastname: z.string().min(1, { message: "Last name is required" }),
    address1: z.string().min(1, { message: "Address is required" }),
    address2: z.string().optional(),
    address3: z.string().optional(),
    poscode: z.coerce.number().min(1, { message: "Poscode is required." }),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    phonenumber: z.coerce
      .number()
      .min(1, { message: "Phone number is required." }),
    dateofbirth: z.string().min(1, { message: "Date of birth is required." }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    path: ["confirmpassword"],
    message: "Password and Confirm Password does not match",
  });
// z.preprocess((arg) => {
//     if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
//   }, z.date()),
// z.preprocess(Number, z.coerce.number()),

//Zod and normal formfields comparison
type FormFields = z.infer<typeof schema>;
// type FormFields = {
//   username: string;
//   email: string;
//   password: string;
//   confirmpassword: string;
//   firstname: string;
//   lastname: string;
//   address: string;
//   address2: string;
//   address3: string;
//   poscode: number;
//   city: string;
//   state: string;
//   dateofbirth: Date;
//   phonenumber: number;
// };

const SignUpLayout = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [usernameTaken, setUsernameTaken] = useState<boolean>(false);

  const [openDynamicDialog, setOpenDynamicDialog] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string>("");
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [openSpinner, setOpenSpinner] = useState<boolean>(false);

  const [openDynamicDialogMessage, setOpenDynamicDialogMessage] =
    useState<boolean>(false);
  const [dialogSuccessMessage, setDialogSuccessMessage] = useState<string>("");
  const [dialogSuccessTitle, setDialogSuccessTitle] = useState<string>("");

  const dynamicDialogSetter = (
    dialogTitle: string,
    dialogMessage: string,
    openDialog: boolean,
  ) => {
    setDialogMessage(dialogMessage);
    setDialogTitle(dialogTitle);
    setOpenDynamicDialog(openDialog);
  };

  const dynamicSuccessDialogSetter = (
    dialogTitle: string,
    dialogMessage: string,
    openDialog: boolean,
  ) => {
    setDialogSuccessMessage(dialogMessage);
    setDialogSuccessTitle(dialogTitle);
    setOpenDynamicDialogMessage(openDialog);
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // const testing = await new Promise((resolve) => setTimeout(resolve, 2000));
    // console.log(data);
    // console.log(new Date(data.dateofbirth).toISOString());
    try {
      setOpenSpinner(true);
      const emailRegistered = await checkEmailRegister(data.email.toString());

      if (emailRegistered === true) {
        setOpenSpinner(false);
        dynamicDialogSetter(
          "Email registered",
          "Email already registered. Please try other email.",
          true,
        );
      } else {
        const signUpProcess: RegisterDataUIProps = await signUp({
          isAdmin: false,
          username: data.username,
          email: data.email,
          password: data.password,
          firstName: data.confirmpassword,
          lastName: data.lastname,
          address1: data.address1,
          address2: data.address2 ?? "-",
          address3: data.address3 ?? "-",
          poscode: data.poscode,
          city: data.city,
          state: data.state,
          age: ageFromDateOfBirthday(data.dateofbirth),
          phoneNumber: data.phonenumber,
          dateOfBirth: new Date(data.dateofbirth),
          profileImage: "-",
        });
        setOpenSpinner(false);
        if (signUpProcess.status === "ok") {
          dynamicSuccessDialogSetter(
            "Account successfully registered",
            `Account registered. Email verification had sent to ${data.email.toString()}.`,
            true,
          );
        } else if (signUpProcess.status === "error") {
          dynamicDialogSetter("Error", signUpProcess.status, true);
        } else {
          dynamicDialogSetter(
            "Error",
            "Something went wrong. Please try again",
            true,
          );
        }
      }
    } catch (error) {
      setOpenSpinner(false);
      dynamicDialogSetter(
        "Error",
        "Something went wrong. Please try again",
        true,
      );
    }
    // try {
    //   const testing = await new Promise((resolve) => setTimeout(resolve, 2000));
    //   if (data.username === "abcde") {
    //     setError("username", { message: "This username already taken." });
    //     throw new Error();
    //   } else {
    //     console.log(data);
    //     console.log(new Date(data.dateofbirth).toISOString());
    //   }
    // } catch (error) {
    //   setError("root", { message: "Something went wrong, please try again." });
    // }
  };

  const debounceCheckUsername = debounce(
    (data: ChangeEvent<HTMLInputElement>) => checkUsernameRegister(data),
    600,
  );

  async function checkUsernameRegister(data: ChangeEvent<HTMLInputElement>) {
    try {
      if (data.target.value.length >= 8) {
        const usernameChecking: IEmailUsernameCheckProps = await checkUsername(
          data.target.value,
        );

        console.log(usernameChecking.status);

        if (usernameChecking.status === "ok") {
          //this mean username not taken
          setUsernameTaken(false);
        } else if (usernameChecking.status === "error") {
          //this mean username taken
          setUsernameTaken(true);
        } else {
          console.log("Something went wrong");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function checkEmailRegister(email: string): Promise<boolean> {
    try {
      const emailChecking: IEmailUsernameCheckProps = await checkEmail(email);

      console.log(emailChecking.status);

      if (emailChecking.status === "ok") {
        //this mean email not taken
        return false;
      } else if (emailChecking.status === "error") {
        //this mean username taken
        return true;
      } else {
        throw new Error("Something went wrong. Please try again");
      }
    } catch (error) {
      throw new Error("Something went wrong. Please try again");
    }
  }

  async function signUp(data: ISignUpProps): Promise<RegisterDataUIProps> {
    const signUpData: IRegisterProps = await userRegister(data);

    return {
      status: signUpData.status,
      message: signUpData.message,
    };
  }

  return (
    <form className="lg:mt-[90px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="m-4 grid gap-[50px] rounded-3xl bg-white p-10 sm:max-md:mx-6 md:mx-[100px] lg:mx-[130px] xl:grid-cols-3">
        <div className="flex flex-col rounded-lg xl:flex-row">
          <div className="flex w-full flex-col gap-4">
            <div id="username">
              <h1 className="signUpLabel">Username</h1>
              <input
                {...register("username")}
                type="text"
                id="username"
                name="username"
                className="signupInput"
                // onChange={checkUsernameRegister}
                onChange={debounceCheckUsername}
              />
              <p className="mt-1 pl-1 pr-4 text-xs text-smalltextbrandcolor">
                Username must be{" "}
                <span className="font-extrabold">8 characters</span> or more
                with{" "}
                <span className="font-extrabold">
                  at least 1 capital letter
                </span>
                , <span className="font-extrabold">1 special character</span>{" "}
                and <span className="font-extrabold">number</span>.
              </p>
              {errors?.username && (
                <p className="signUpError">{errors.username.message}</p>
              )}
              {usernameTaken === true ? (
                <p className="signUpError">Username already taken.</p>
              ) : (
                <></>
              )}
            </div>
            <div id="email">
              <h1 className="signUpLabel">Email</h1>
              <input
                {...register("email")}
                type="text"
                id="email"
                name="email"
                className="signupInput"
              />
              {errors?.email && (
                <p className="signUpError">{errors.email.message}</p>
              )}
            </div>
            <div id="password">
              <h1 className="signUpLabel">Password</h1>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="signupInput"
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
              <p className="mt-1 pl-2 pr-4 text-xs text-smalltextbrandcolor">
                Your password must contain at{" "}
                <span className="font-extrabold">least 8 characters</span>,
                include both{" "}
                <span className="font-extrabold">upper and lower case</span>{" "}
                letters, and a{" "}
                <span className="font-extrabold">number/special character</span>
                . Eg, Def8765#
              </p>
              {errors?.password && (
                <p className="signUpError">{errors.password.message}</p>
              )}
            </div>
            <div id="confirmpassword">
              <h1 className="signUpLabel">Confirm Password</h1>
              <div className="relative">
                <input
                  {...register("confirmpassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmpassword"
                  name="confirmpassword"
                  className="signupInput"
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute right-1 top-[7px] hover:bg-transparent"
                  onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="text-xl text-gray-500" />
                  ) : (
                    <FiEye className="text-xl text-gray-500" />
                  )}
                </Button>
              </div>
              {errors?.confirmpassword && (
                <p className="signUpError">{errors.confirmpassword.message}</p>
              )}
            </div>
            <div id="firstname">
              <h1 className="signUpLabel">First Name</h1>
              <input
                {...register("firstname")}
                type="text"
                id="firstname"
                name="firstname"
                className="signupInput"
              />
              {errors?.firstname && (
                <p className="signUpError">{errors.firstname.message}</p>
              )}
            </div>
            <div id="lastname">
              <h1 className="signUpLabel">Last Name</h1>
              <input
                {...register("lastname")}
                type="text"
                id="lastname"
                name="lastname"
                className="signupInput"
              />
              {errors?.lastname && (
                <p className="signUpError">{errors.lastname.message}</p>
              )}
            </div>
          </div>
          <Separator
            orientation="vertical"
            className="ml-14 bg-slate-300 max-xl:hidden"
          />
          <Separator
            orientation="horizontal"
            className="mt-16 bg-slate-300 xl:hidden"
          />
        </div>
        <div className="flex flex-col rounded-lg xl:flex-row">
          <div className="flex w-full flex-col gap-[33.5px]">
            <div id="address1">
              <h1 className="signUpLabel">Address</h1>
              <input
                {...register("address1")}
                type="text"
                id="address1"
                name="address1"
                className="signupInput"
              />
              {errors?.address1 && (
                <p className="signUpError">{errors.address1.message}</p>
              )}
            </div>
            <div id="address2">
              <h1 className="signUpLabel flex items-center">
                Address 2{" "}
                <span className="ml-1 text-sm font-medium">(Optional)</span>
              </h1>
              <input
                {...register("address2")}
                type="text"
                id="address2"
                name="address2"
                className="signupInput"
              />
              {errors?.address2 && (
                <p className="signUpError">{errors.address2.message}</p>
              )}
            </div>
            <div id="address3">
              <h1 className="signUpLabel flex items-center">
                Address 3{" "}
                <span className="ml-1 text-sm font-medium">(Optional)</span>
              </h1>
              <input
                {...register("address3")}
                type="text"
                id="address3"
                name="address3"
                className="signupInput"
              />
              {errors?.address3 && (
                <p className="signUpError">{errors.address3.message}</p>
              )}
            </div>
            <div id="poscode">
              <h1 className="signUpLabel">Poscode</h1>
              <input
                {...register("poscode")}
                type="number"
                id="poscode"
                name="poscode"
                className="signupInput"
                min={0}
              />
              {errors?.poscode && (
                <p className="signUpError">{errors.poscode.message}</p>
              )}
            </div>
            <div id="city">
              <h1 className="signUpLabel">City</h1>
              <input
                {...register("city")}
                type="text"
                id="city"
                name="city"
                className="signupInput"
              />
              {errors?.city && (
                <p className="signUpError">{errors.city.message}</p>
              )}
            </div>
            <div id="state">
              <h1 className="signUpLabel">State</h1>
              <input
                {...register("state")}
                type="text"
                id="state"
                name="state"
                className="signupInput"
              />
              {errors?.state && (
                <p className="signUpError">{errors.state.message}</p>
              )}
            </div>
          </div>
          <Separator
            orientation="vertical"
            className="ml-14 bg-slate-300 max-xl:hidden"
          />
          <Separator
            orientation="horizontal"
            className="mt-16 bg-slate-300 xl:hidden"
          />
        </div>
        <div className="flex flex-col items-center justify-between rounded-lg">
          <div className="flex w-full flex-col gap-[17.5px]">
            <div id="dateofbirth">
              <h1 className="signUpLabel">Date of Birth</h1>
              <input
                {...register("dateofbirth")}
                type="date"
                id="dateofbirth"
                name="dateofbirth"
                className="signupInput flex justify-center"
              />
              {errors?.dateofbirth && (
                <p className="signUpError">{errors.dateofbirth.message}</p>
              )}
            </div>
            <div id="phonenumber">
              <h1 className="signUpLabel">Phone Number</h1>
              <div className="flex items-center">
                <h2 className="pl-4 pr-2 text-xl font-bold">+60</h2>
                <input
                  {...register("phonenumber")}
                  type="number"
                  id="phonenumber"
                  name="phonenumber"
                  className="signupInput flex justify-center"
                  min={0}
                />
              </div>
              {errors?.phonenumber && (
                <p className="signUpError">{errors.phonenumber.message}</p>
              )}
            </div>
          </div>
          <div className="mt-10 w-full">
            {errors?.root && (
              <p className="signUpError mb-5 text-center">
                {errors.root.message}
              </p>
            )}
            <Button
              disabled={!isDirty || isSubmitting}
              type="submit"
              className="h-11 w-full rounded-full bg-specialyellow font-bold tracking-wider text-black hover:bg-specialyellowhover hover:font-extrabold"
            >
              {isSubmitting ? "SIGNING UP ....." : "SIGN UP"}
            </Button>
            <LoadingDialog open={openSpinner} setOpen={setOpenSpinner} />
            <DynamicAlertDialog
              open={openDynamicDialog}
              setOpen={setOpenDynamicDialog}
              message={dialogMessage}
              title={dialogTitle}
            />
            <DynamicDialogMessages
              open={openDynamicDialogMessage}
              setOpen={setOpenDynamicDialogMessage}
              message={dialogSuccessMessage}
              title={dialogSuccessTitle}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUpLayout;
