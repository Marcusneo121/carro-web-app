"use client";

import React from "react";
import AuthPageHeader from "../components/AuthPageHeader";
import { Input } from "@/components/ui/input";
import { FormEventHandler, useState } from "react";
import { Button } from "@/components/ui/button";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Separator } from "@/components/ui/separator";
import DatePicker from "@/components/DatePicker";
import { useForm, SubmitHandler } from "react-hook-form";
import SignUpForm from "./components/SignUpForm";
import SignUpLayout from "./components/SignUpLayout";

// type Inputs = {
//   // isAdmin: boolean;
//   username: string;
//   email: string;
//   password: string;
//   confirmpassword: string;
//   firstname: string;
//   lastname: string;
//   address1: string;
//   address2: string;
//   address3: string;
//   poscode: string;
//   city: string;
//   state: string;
//   // age: number;
//   phonenumber: string;
//   dob: Date;
//   // profileImage: string;
// };

const SignUp = () => {
  // const [username, setUsername] = useState<string>("");
  // const [showPassword, setShowPassword] = useState<boolean>(false);
  // const [showConfirmPassword, setShowConfirmPassword] =
  //   useState<boolean>(false);
  // const [password, setPassword] = useState<string>("");
  // const [confirmPassword, setConfirmPassword] = useState<string>("");
  // const [date, setDate] = useState<Date>();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
    } catch (error) {}
  };

  return (
    <div className="flex min-h-screen flex-col bg-brandprimary">
      <AuthPageHeader />
      <SignUpLayout />
    </div>
  );
};

export default SignUp;
