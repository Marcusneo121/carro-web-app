"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import DatePicker from "@/components/DatePicker";
import { Separator } from "@/components/ui/separator";
import { IEmailUsernameCheckProps } from "@/types/api_index";
import { checkUsername } from "@/services/auth";
import { IoCheckmark } from "react-icons/io5";
import debounce from "lodash.debounce";
import test from "node:test";
import useDebouncer from "@/app/hooks/useDebouncer";

const regexUsernamePassword: RegExp = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
);

const FormSchema = z
  .object({
    username: z
      .string({ required_error: "Username is required." })
      .regex(regexUsernamePassword, {
        message: "Username format incorrect. Please follow instruction below.",
      }),
    // .min(8, {
    //   message: "Username must be at least 8 characters.",
    // }),
    email: z
      .string({ required_error: "Email is required." })
      .email({ message: "Email is not in correct format." }),
    password: z
      .string({ required_error: "Password is required." })
      .regex(regexUsernamePassword, {
        message: "Passwords format incorrect. Please follow instruction below.",
      }),
    // .min(8, {
    //   message: "Password must be at least 8 characters.",
    // }),
    confirmpassword: z
      .string({ required_error: "Confirm password is required." })
      .regex(regexUsernamePassword, {
        message:
          "Confirm password format incorrect. Please follow instruction below.",
      }),
    // .min(8, {
    //   message: "Password must be at least 8 characters.",
    // }),
    firstname: z.string({ required_error: "First name is required." }),
    lastname: z.string({ required_error: "Last name is required." }),
    address1: z.string({ required_error: "Address is required." }),
    address2: z.string().optional(),
    address3: z.string().optional(),
    poscode: z.number({ required_error: "Poscode is required." }).min(4, {
      message: "Poscode must be at least 4 characters.",
    }),
    city: z.string({ required_error: "City is required." }),
    state: z.string({ required_error: "State is required." }),
    phonenumber: z
      .number({ required_error: "Phone number is required." })
      .min(8, {
        message: "Phone number must be at least 8 characters.",
      }),
    dateofbirth: z.string().datetime(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    path: ["confirmpassword"],
    message: "Passwords does not match",
  });

const SignUpForm = () => {
  const [username, setUsername] = useState<string>("");
  const [usernameTaken, setUsernameTaken] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [date, setDate] = useState<Date>();
  // const debouncedUsernameCheck = useDebouncer(checkUsernameRegister, 500);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    // defaultValues: {
    //   username: undefined,
    //   email: undefined,
    //   password: undefined,
    //   confirmpassword: undefined,
    //   firstname: undefined,
    //   lastname: undefined,
    //   address1: undefined,
    //   address2: undefined,
    //   address3: undefined,
    //   poscode: undefined,
    //   city: undefined,
    //   state: undefined,
    //   phonenumber: undefined,
    //   dateofbirth: undefined,
    // },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

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


  return (
    <Form {...form}>
      <form className="lg:mt-[90px]" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="m-4 grid gap-[50px] rounded-3xl bg-white p-10 sm:max-md:mx-6 md:mx-[100px] lg:mx-[130px] xl:grid-cols-3">
          <div className="flex flex-col rounded-lg xl:flex-row">
            <div className="flex w-full flex-col gap-4">
              {/* Username */}
              <div>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pl-1 text-lg font-bold">
                        Username
                      </FormLabel>
                      <FormControl onChange={checkUsernameRegister}>
                        <Input
                          {...field}
                          className="text-md h-12 rounded-xl border-2 focus:border-purple-200"
                        />
                      </FormControl>
                      {usernameTaken === true ? (
                        <p className="text-[13px] leading-none text-red-500">
                          Username already taken.
                        </p>
                      ) : (
                        <></>
                      )}
                      <FormMessage />
                      <FormDescription>
                        <p className="mt-1 pr-4 text-xs text-smalltextbrandcolor">
                          Username must be{" "}
                          <span className="font-extrabold">8 characters</span>{" "}
                          or more with{" "}
                          <span className="font-extrabold">
                            at least 1 capital letter
                          </span>
                          ,{" "}
                          <span className="font-extrabold">
                            1 special character
                          </span>{" "}
                          and <span className="font-extrabold">number</span>.
                        </p>
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              {/* Email */}
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="p-0 pl-1 text-lg font-bold">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-md h-12 rounded-xl border-2 focus:border-purple-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Password */}
              <div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pl-1 text-lg font-bold">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            className="text-md h-12 rounded-xl border-2 tracking-wider focus:border-purple-200"
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
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        <p className="mt-1 pr-4 text-xs text-smalltextbrandcolor">
                          Your password must contain at{" "}
                          <span className="font-extrabold">
                            least 8 characters
                          </span>
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
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              {/* Confirm password */}
              <div>
                <FormField
                  control={form.control}
                  name="confirmpassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pl-1 text-lg font-bold">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            className="text-md h-12 rounded-xl border-2 tracking-wider focus:border-purple-200"
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* First name */}
              <div>
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pl-1 text-lg font-bold">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-md h-12 rounded-xl border-2 focus:border-purple-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Last name */}
              <div>
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pl-1 text-lg font-bold">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-md h-12 rounded-xl border-2 focus:border-purple-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
              {/* Address */}
              <div>
                <div>
                  <FormField
                    control={form.control}
                    name="address1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="pl-1 text-lg font-bold">
                          Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="text-md h-12 rounded-xl border-2 focus:border-purple-200"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* Address 2 */}
              <div>
                <FormField
                  control={form.control}
                  name="address2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center pl-1 text-lg font-bold">
                        Address 2{" "}
                        <span className="ml-1 text-sm font-medium">
                          (Optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-md h-12 rounded-xl border-2 focus:border-purple-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Address 3 */}
              <div>
                <FormField
                  control={form.control}
                  name="address2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center pl-1 text-lg font-bold">
                        Address 3{" "}
                        <span className="ml-1 text-sm font-medium">
                          (Optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-md h-12 rounded-xl border-2 focus:border-purple-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Poscode */}
              <div>
                <FormField
                  control={form.control}
                  name="poscode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center pl-1 text-lg font-bold">
                        Poscode{" "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          className="text-md h-12 rounded-xl border-2 focus:border-purple-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* City */}
              <div>
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center pl-1 text-lg font-bold">
                        City
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-md h-12 rounded-xl border-2 focus:border-purple-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* State */}
              <div>
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center pl-1 text-lg font-bold">
                        State
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-md h-12 rounded-xl border-2 focus:border-purple-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
              {/* Date of Birth */}
              <div>
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="dateofbirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center pl-1 text-lg font-bold">
                          Date of Birth
                        </FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            type="date"
                            className="flex w-full items-center justify-center rounded-xl border-2 p-2 px-4"
                            onChange={(e) => {
                              console.log(e.target.value);
                            }}
                          />
                          {/* <DatePicker
                            date={date}
                            setDate={setDate}
                            {...field}
                          /> */}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* Phone Number */}
              <div>
                <FormField
                  control={form.control}
                  name="phonenumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center pl-1 text-lg font-bold">
                        Phone No.
                      </FormLabel>
                      <FormControl>
                        <div  >
                          <h2 className="pl-4 pr-2 text-xl font-bold">+60</h2>
                          <Input
                            {...field}
                            className="text-md h-12 rounded-xl border-2 focus:border-purple-200"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="mt-10 w-full">
              <Button
                type="submit"
                className="h-11 w-full rounded-full bg-specialyellow font-bold tracking-wider text-black hover:bg-specialyellowhover hover:font-extrabold"
              >
                SIGN UP
              </Button>
              {/* <Button
                onClick={() => {
                  console.log(date?.toISOString() || undefined);
                }}
                className="h-11 w-full rounded-full bg-specialyellow font-bold tracking-wider text-black hover:bg-specialyellowhover hover:font-extrabold"
              >
                SIGN UP
              </Button> */}
            </div>
          </div>
        </div>
      </form>
      {/* <form onSubmit={form.handleSubmit(onSubmit)} className="lg:mt-[100px]">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form> */}
    </Form>
  );
};

export default SignUpForm;
