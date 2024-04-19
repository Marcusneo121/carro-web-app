import { IAddHostCarData } from "@/types/api_index";
import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

export interface ImageUploadInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  identifier: string;
  carData: IAddHostCarData | undefined;
  setCarData: (carData: IAddHostCarData) => void;
  onClickForClose: () => void;
  //   onClick: () => void;
  //   onSelectCarData: () => void;
}

const ImageUploadFileInput = React.forwardRef<
  HTMLInputElement,
  ImageUploadInputProps
>(
  (
    {
      placeholder,
      identifier,
      carData,
      setCarData,
      onClickForClose,
      type,
      ...props
    },
    ref,
  ) => {
    const [selectedImage, setSelectedImage] = useState<string | undefined>();

    const handleImageChange = (event: any) => {
      const file: File = event.target.files[0];
      if (file) {
        setSelectedImage(URL.createObjectURL(event.target.files[0]));
        switch (identifier) {
          case "ext1": {
            setCarData({ ...carData, carMainPic: file });
            break;
          }
          case "ext2": {
            setCarData({ ...carData, carImageOne: file });
            break;
          }
          case "ext3": {
            setCarData({ ...carData, carImageTwo: file });
            break;
          }
          case "int1": {
            setCarData({ ...carData, carImageThree: file });
            break;
          }
          case "int2": {
            setCarData({ ...carData, carImageFour: file });
            break;
          }
          default: {
            break;
          }
        }

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
              onClickForClose();
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
  },
);

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
