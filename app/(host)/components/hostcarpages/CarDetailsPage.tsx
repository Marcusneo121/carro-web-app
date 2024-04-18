"use client";

import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import NextPreviousSubmitButton from "../NextPreviousSubmitButton";
import { AddHostCarData } from "@/types/api_index";

interface NextPreviousSubmitButtonProps {
  page: number;
  setPage: (currPage: any) => void;
  carData: AddHostCarData | undefined;
  setCarData: (carData: AddHostCarData) => void;
}

const CarDetailsPage: React.FC<NextPreviousSubmitButtonProps> = ({
  page,
  setPage,
  carData,
  setCarData,
}) => {
  const schema = z.object({
    carbrandname: z
      .string()
      .min(1, { message: "Car Brand & Name is required." }),
    color: z
      .string({ required_error: "Color is required." })
      .min(1, { message: "Color is required." }),
    // isElectric: z.coerce.boolean().default(false).optional(),
    enginecapacity: z.coerce
      .number({ required_error: "Engine Capacity / Power Output is required." })
      .min(1, { message: "Engine Capacity / Power Output is required." }),
    carplate: z
      .string({ required_error: "Car plate is required." })
      .min(1, { message: "Car plate is required." }),
    seat: z.coerce
      .number({ required_error: "Seat is required." })
      .min(1, { message: "Seat is required." }),
    yearmade: z.coerce
      .number({ required_error: "Year made is required." })
      .min(1, { message: "Year made is required." }),
    // seat: z.coerce.number().min(1, { message: "Seat number is required." }),
    // yearmade: z.coerce.number().min(1, { message: "Year made is required." }),
  });
  type FormFields = z.infer<typeof schema>;
  const {
    reset,
    register,
    handleSubmit,
    resetField,
    setError,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setCarData({
      ...carData,
      carName: data.carbrandname.toString(),
      color: data.color.toString(),
      engineCapacity: data.enginecapacity.toString(),
      carPlate: data.carplate.toString(),
      seat: data.seat.toString(),
      yearMade: data.yearmade.toString(),
      isElectric:
        carData?.isElectric === undefined ? false : carData?.isElectric,
    });
    setPage((currPage: any) => currPage + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [isElectric, setIsElectric] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 w-full rounded-2xl bg-slate-50">
          <div className="px-8 py-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="ml-1 font-bold">Car Brand & Name</h2>
                <input
                  {...register("carbrandname")}
                  type="text"
                  className="inputBasic"
                  placeholder="e.g. Perodua Myvi"
                  defaultValue={
                    carData?.carName !== undefined
                      ? carData?.carName
                      : undefined
                  }
                />
                {errors?.carbrandname && (
                  <p className="signUpError">{errors.carbrandname.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="ml-1 font-bold">Color</h2>
                <input
                  {...register("color")}
                  type="text"
                  className="inputBasic"
                  placeholder="e.g. Yellow"
                  defaultValue={
                    carData?.color !== undefined ? carData?.color : undefined
                  }
                />
                {errors?.color && (
                  <p className="signUpError">{errors.color.message}</p>
                )}
              </div>

              <div className="ml-1 flex items-center space-x-2">
                <Checkbox
                  id="isElectric"
                  className="h-5 w-5 data-[state=checked]:border-brandprimary data-[state=checked]:bg-brandprimary"
                  checked={carData?.isElectric}
                  onCheckedChange={() => {
                    setCarData({
                      ...carData,
                      isElectric: !carData?.isElectric,
                    });
                    resetField("enginecapacity");
                    // setIsElectric((currentState: boolean) => !currentState);
                  }}
                />
                <label
                  htmlFor="terms2"
                  className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Is Electric Car ?
                </label>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="ml-1 font-bold">
                  {carData?.isElectric
                    ? "Power Output (kW)"
                    : "Engine Capacity (cc)"}
                </h2>
                <input
                  {...register("enginecapacity")}
                  type="number"
                  className="inputBasic"
                  placeholder={carData?.isElectric ? "100" : "e.g. 1.5"}
                  step="0.1"
                  defaultValue={
                    carData?.engineCapacity !== undefined
                      ? carData?.engineCapacity
                      : undefined
                  }
                />
                {errors?.enginecapacity && (
                  <p className="signUpError">{errors.enginecapacity.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="ml-1 font-bold">Year Made</h2>
                <input
                  {...register("yearmade")}
                  type="number"
                  className="inputBasic"
                  placeholder="e.g. 2024"
                  defaultValue={
                    carData?.yearMade !== undefined
                      ? carData?.yearMade
                      : undefined
                  }
                />
                {errors?.yearmade && (
                  <p className="signUpError">{errors.yearmade.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="ml-1 font-bold">Car Plate</h2>
                <input
                  {...register("carplate")}
                  type="text"
                  className="inputBasic"
                  placeholder="e.g. ABC 1234"
                  defaultValue={
                    carData?.carPlate !== undefined
                      ? carData?.carPlate
                      : undefined
                  }
                />
                {errors?.carplate && (
                  <p className="signUpError">{errors.carplate.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="ml-1 font-bold">Seat</h2>
                <input
                  {...register("seat")}
                  type="number"
                  className="inputBasic"
                  placeholder="e.g. 5"
                  defaultValue={
                    carData?.seat !== undefined ? carData?.seat : undefined
                  }
                />
                {errors?.seat && (
                  <p className="signUpError">{errors.seat.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <NextPreviousSubmitButton
          page={page}
          setPage={setPage}
          onNextAction={() => {
            return false;
          }}
        />
      </form>
    </div>
  );
};

export default CarDetailsPage;
