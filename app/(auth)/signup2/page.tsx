"use client";

import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

// isAdmin: boolean;
//   username: string;
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   address1: string;
//   address2: string;
//   address3: string;
//   poscode: string;
//   city: string;
//   state: string;
//   age: number;
//   phoneNumber: string;
//   dateOfBirth: Date;
//   profileImage: string;

const SignUp = () => {
  const [username, setUsername] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  return (
    <div className="flex h-full justify-center bg-brandprimary pb-[200px]">
      <div className="rounded-3xl bg-white p-10">
        <form>
          <div className="flex flex-row gap-10 max-lg:flex-col">
            <div className="flex w-full flex-col">
              {/* Username */}
              <div>
                <h1 className="pl-1 text-lg font-bold">Username</h1>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder=""
                  className="text-md h-12 rounded-xl border-2 focus:border-purple-200"
                  onChange={(e) => {
                    //   setUsername(e.target.value.toString());
                  }}
                  required
                />
                <p className="mt-1 pl-2 pr-4 text-xs text-smalltextbrandcolor">
                  Username must be{" "}
                  <span className="font-extrabold">8 characters</span> or more
                  with{" "}
                  <span className="font-extrabold">
                    at least 1 capital letter
                  </span>
                  , <span className="font-extrabold">1 special character</span>{" "}
                  and <span className="font-extrabold">number</span>.
                </p>
              </div>
              {/* Email */}
              <div>
                <h1 className="pl-1 text-lg font-bold">Email</h1>
                <Input
                  type="text"
                  id="email"
                  name="email"
                  placeholder=""
                  className="text-md h-12 rounded-xl border-2 focus:border-purple-200"
                  onChange={(e) => {
                    //   setUsername(e.target.value.toString());
                  }}
                  required
                />
              </div>
              {/* Password */}
              <div>
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
                <p className="mt-1 pl-2 pr-4 text-xs text-smalltextbrandcolor">
                  Your password must contain at{" "}
                  <span className="font-extrabold">least 8 characters</span>,
                  include both{" "}
                  <span className="font-extrabold">upper and lower case</span>{" "}
                  letters, and a{" "}
                  <span className="font-extrabold">
                    number/special character
                  </span>
                  . Eg, Def8765#
                </p>
              </div>
              {/* Confirm password */}
              <div>
                <h1 className="pl-1 text-lg font-bold">Confirm Password</h1>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password"
                    name="confirm-password"
                    placeholder=""
                    className="text-md h-12 rounded-xl border-2 tracking-wider focus:border-purple-200"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value.toString());
                    }}
                    required
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
              </div>
              {/* First name */}
              <div>
                <h1 className="pl-1 text-lg font-bold">First name</h1>
                <Input
                  type="text"
                  id="first-name"
                  name="first-name"
                  placeholder=""
                  className="text-md h-12 rounded-xl border-2 focus:border-purple-200"
                  onChange={(e) => {
                    //   setUsername(e.target.value.toString());
                  }}
                  required
                />
              </div>
              {/* Last name */}
              <div>
                <h1 className="pl-1 text-lg font-bold">Last Name</h1>
                <Input
                  type="text"
                  id="last-name"
                  name="last-name"
                  placeholder=""
                  className="text-md h-12 rounded-xl border-2 focus:border-purple-200"
                  onChange={(e) => {
                    //   setUsername(e.target.value.toString());
                  }}
                  required
                />
              </div>
            </div>
            <div className="flex w-full flex-col">
              {/* Address */}
              <div>
                <h1 className="pl-1 text-lg font-bold">Address</h1>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  placeholder=""
                  className="text-md h-12 rounded-xl border-2 focus:border-purple-200"
                  onChange={(e) => {
                    //   setUsername(e.target.value.toString());
                  }}
                  required
                />
              </div>
              {/* Address 2 */}
              <div>
                <h1 className="flex items-center pl-1 text-lg font-bold">
                  Address 2{" "}
                  <span className="ml-1 text-sm font-medium">(Optional)</span>
                </h1>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  placeholder=""
                  className="text-md h-12 rounded-xl border-2 focus:border-purple-200"
                  onChange={(e) => {
                    //   setUsername(e.target.value.toString());
                  }}
                  required
                />
              </div>
              {/* Address 3 */}
              <div>
                <h1 className="flex items-center pl-1 text-lg font-bold">
                  Address 3{" "}
                  <span className="ml-1 text-sm font-medium">(Optional)</span>
                </h1>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  placeholder=""
                  className="text-md h-12 rounded-xl border-2 focus:border-purple-200"
                  onChange={(e) => {
                    //   setUsername(e.target.value.toString());
                  }}
                  required
                />
              </div>
              {/* Poscode */}
              <div>
                <h1 className="pl-1 text-lg font-bold">Poscode</h1>
                <Input
                  type="text"
                  id="poscode"
                  name="poscode"
                  placeholder=""
                  className="text-md h-12 rounded-xl border-2 focus:border-purple-200"
                  onChange={(e) => {
                    //   setUsername(e.target.value.toString());
                  }}
                  required
                />
              </div>
              {/* City */}
              <div>
                <h1 className="pl-1 text-lg font-bold">City</h1>
                <Input
                  type="text"
                  id="city"
                  name="city"
                  placeholder=""
                  className="text-md h-12 rounded-xl border-2 focus:border-purple-200"
                  onChange={(e) => {
                    //   setUsername(e.target.value.toString());
                  }}
                  required
                />
              </div>
              {/* State */}
              <div>
                <h1 className="pl-1 text-lg font-bold">State</h1>
                <Input
                  type="text"
                  id="state"
                  name="state"
                  placeholder=""
                  className="text-md h-12 rounded-xl border-2 focus:border-purple-200"
                  onChange={(e) => {
                    //   setUsername(e.target.value.toString());
                  }}
                  required
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
