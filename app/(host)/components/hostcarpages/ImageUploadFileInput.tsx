import { AddHostCarData } from "@/types/api_index";
import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

export interface ImageUploadInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  onClick: () => void;
  carData: AddHostCarData | undefined;
  setCarData: (carData: AddHostCarData) => void;
}

const ImageUploadFileInput = React.forwardRef<
  HTMLInputElement,
  ImageUploadInputProps
>(({ placeholder, type, ...props }, ref) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>();

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
      //   const reader = new FileReader();
      //   reader.onload = (e) => {
      //     const imageData = event.target.result;
      //     console.log("imageData: ", imageData);
      //     const dataURL = `data:image/jpeg;base64,${btoa(imageData)}`;
      //     console.log("dataURL: ", dataURL);
      //     setSelectedImage(dataURL);
      //   };
      //   reader.readAsBinaryString(file);
    }
  };

  if (selectedImage !== undefined) {
    return (
      <div className="relative">
        <div
          className="absolute -right-3 -top-2 rounded-full bg-brandprimary p-1"
          onClick={() => {
            setSelectedImage(undefined);
          }}
        >
          <IoClose className="text-white md:text-2xl" />
        </div>
        <img
          alt="preview image"
          src={selectedImage}
          className="h-[80px] w-[80px] rounded-2xl object-cover md:h-[120px] md:w-[120px]"
        />
      </div>
    );
  } else {
    return (
      <div
        className="flex h-[80px] w-[80px] flex-col items-center justify-center rounded-2xl border-2 border-purple-200 bg-purple-50 md:h-[120px] md:w-[120px]"
        onClick={props.onClick}
      >
        <div>
          <div className="flex flex-col items-center justify-center">
            <IoIosAdd className="text-[25px] text-brandprimary md:text-[40px]" />{" "}
            <h4 className="text-[10px] font-extrabold text-brandprimary md:text-xs">
              {placeholder}
            </h4>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={ref}
            {...props}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
      </div>
    );
  }
});

export default ImageUploadFileInput;

{
  /* <div className="relative h-[100px] w-[100px]"> */
}
{
  /* md:h-20 md:w-20 */
}
{
  /* <Image
              alt="carro logo"
              src={selectedImage}
              fill={true}
              objectFit="cover"
            /> */
}
{
  /* </div> */
}

// <Button onClick={props.onClick}>
//   {placeholder}
//   <input type="file" ref={ref} {...props} style={{ display: "none" }} />
// </Button>
