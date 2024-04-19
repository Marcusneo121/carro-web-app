import { Separator } from "@/components/ui/separator";
import React, { useEffect } from "react";
import NextPreviousSubmitButton from "../NextPreviousSubmitButton";
import { IAddHostCarData } from "@/types/api_index";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  dateFormatterBooking,
  dateFormatterGMT,
  dateIsBefore,
} from "@/utils/utils";
import toast from "react-hot-toast";

interface NextPreviousSubmitButtonProps {
  page: number;
  setPage: (currPage: any) => void;
  carData: IAddHostCarData | undefined;
  setCarData: (carData: IAddHostCarData) => void;
}
const PriceLocationPage: React.FC<NextPreviousSubmitButtonProps> = ({
  page,
  setPage,
  carData,
  setCarData,
}) => {
  const schema = z.object({
    price: z.coerce.number().min(1, { message: "Price is required." }),
    location: z.string().min(1, { message: "Location is required." }),
    availablefromdate: z
      .string()
      .min(1, { message: "Available from date & time is required." }),
    availabletodate: z
      .string()
      .min(1, { message: "Available to date & time is required." }),
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

  const validateFromToTimeNow = (data: FormFields) => {
    const timeNow = new Date();
    const availableFromDate = new Date(data.availablefromdate);
    const availableToDate = new Date(data.availabletodate);

    if (
      dateIsBefore(availableFromDate, timeNow) === true &&
      dateIsBefore(availableToDate, timeNow) === true
    ) {
      toast.error("Please ensure date time is not before current date time.", {
        duration: 2000,
      });
      return false;
    } else if (
      dateIsBefore(availableFromDate, timeNow) === true &&
      dateIsBefore(availableToDate, timeNow) === false
    ) {
      toast.error(
        "Please ensure FROM date time is not before current date time.",
        {
          duration: 2000,
        },
      );
      return false;
    } else if (
      dateIsBefore(availableFromDate, timeNow) === false &&
      dateIsBefore(availableToDate, timeNow) === true
    ) {
      toast.error(
        "Please ensure UNTIL date time is not before current date time.",
        {
          duration: 2000,
        },
      );
      return false;
    } else {
      return true;
    }
  };

  const validateToFrom = (data: FormFields) => {
    const bookingFromDate = new Date(data.availablefromdate);
    const bookingToDate = new Date(data.availabletodate);
    var isValidFromToDate = false;

    if (dateIsBefore(bookingFromDate, bookingToDate) === false) {
      toast.error(
        "Please ensure UNTIL date time is not before FROM date time.",
        {
          duration: 2000,
        },
      );
      isValidFromToDate = false;
    } else {
      isValidFromToDate = true;
    }

    return isValidFromToDate;
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const validateFromToNow = validateFromToTimeNow(data);

    if (validateFromToNow === true) {
      const validateToFromCheck = validateToFrom(data);
      if (validateToFromCheck === true) {
        setCarData({
          ...carData,
          price: data.price.toString(),
          location: data.location.toString(),
          availableFromDate: dateFormatterBooking(data.availablefromdate),
          availableToDate: dateFormatterBooking(data.availabletodate),
        });
        setPage((currPage: any) => currPage + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    console.log(carData);
  });

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 w-full rounded-2xl bg-slate-50">
          <div className="flex flex-col items-center gap-4 px-8 py-6">
            <div className="flex w-full flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div>
                  <h2 className="ml-1 font-bold">Price (per day)</h2>
                  <h3 className="text-[11px] font-semibold italic text-slate-400">
                    * Price should include tax. Tax will be deduct from the
                    total amount.
                  </h3>
                </div>
                <div className="ml-1 flex items-center gap-2">
                  <h2 className="font-bold">RM</h2>
                  <input
                    {...register("price")}
                    type="number"
                    className="inputBasic"
                    placeholder="e.g. 128"
                    defaultValue={
                      carData?.price !== undefined ? carData?.price : undefined
                    }
                  />
                </div>
                {errors?.price && (
                  <p className="signUpError">{errors.price.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <h2 className="ml-1 font-bold">Location</h2>
                  <h3 className="text-[11px] font-semibold italic text-slate-400">
                    * Suggest locations that are popular like mall or building
                  </h3>
                  <h3 className="text-[11px] font-semibold italic text-slate-400">
                    * Don't worry, you can decide pick up location with guest
                    later
                  </h3>
                </div>
                <input
                  {...register("location")}
                  type="text"
                  className="inputBasic"
                  placeholder="e.g. Pavilion Bukit Bintang"
                  defaultValue={
                    carData?.location !== undefined
                      ? carData?.location
                      : undefined
                  }
                />
                {errors?.location && (
                  <p className="signUpError">{errors.location.message}</p>
                )}
              </div>
            </div>
            <Separator className="mb-[10px] mt-[30px] bg-gray-300" />
            <div className="flex w-full flex-col justify-start">
              <h2 className="mb-6 ml-1 text-lg font-bold">Availabiity</h2>
              <div className="flex flex-col gap-4">
                <div className="flex w-full flex-col gap-2">
                  <h2 className="ml-1 text-sm font-bold">From</h2>
                  <input
                    {...register("availablefromdate")}
                    type="datetime-local"
                    className="signupInput text-md font-semibold max-sm:h-10 max-sm:text-base"
                    defaultValue={
                      carData?.availableFromDate !== undefined
                        ? carData?.availableFromDate
                        : undefined
                    }
                  />
                  {errors?.availablefromdate && (
                    <p className="signUpError">
                      {errors.availablefromdate.message}
                    </p>
                  )}
                </div>
                <div className="flex w-full flex-col gap-2">
                  <h2 className="ml-1 text-sm font-bold">Until</h2>
                  <input
                    {...register("availabletodate")}
                    type="datetime-local"
                    className="signupInput text-md font-semibold max-sm:h-10 max-sm:text-base"
                    defaultValue={
                      carData?.availableToDate !== undefined
                        ? carData?.availableToDate
                        : undefined
                    }
                  />
                  {errors?.availabletodate && (
                    <p className="signUpError">
                      {errors.availabletodate.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <NextPreviousSubmitButton
          page={page}
          setPage={setPage}
          onPreviousAction={() => {
            return true;
          }}
          onNextAction={() => {
            return true;
          }}
        />
      </form>
    </div>
  );
};

export default PriceLocationPage;
