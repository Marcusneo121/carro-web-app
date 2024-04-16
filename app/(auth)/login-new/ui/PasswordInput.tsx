"use client";

import { Button } from "@/components/ui/button";
import { InputAttributesUIProps } from "@/types";
import React from "react";
import { InputHTMLAttributes, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          ref={ref}
          {...props}
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
    );
  },
);

export default PasswordInput;

// export interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {}

// const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ type, ...props }, ref) => {
//     const [showPassword, setShowPassword] = useState<boolean>(false);
//     return (
//       <div className="relative">
//         <input
//           type={showPassword ? "text" : "password"}
//           ref={ref}
//           className="signupInput"
//           {...props}
//         />
//         <Button
//           type="button"
//           variant="ghost"
//           className="absolute right-1 top-[7px] hover:bg-transparent"
//           onClick={() => {
//             setShowPassword(!showPassword);
//           }}
//         >
//           {showPassword ? (
//             <FiEyeOff className="text-xl text-gray-500" />
//           ) : (
//             <FiEye className="text-xl text-gray-500" />
//           )}
//         </Button>
//       </div>
//     );

//     // return (
//     //   <input
//     //     type={type}
//     //     className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
//     //     ref={ref}
//     //     {...props}
//     //   />
//     // );
//   },
// );
// PasswordInput.displayName = "PasswordInput";
