"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookingDialogProps } from "@/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { CgClose } from "react-icons/cg";
import {
  dateFormatterBooking,
  dateFormatterGMT,
  dateIsAfter,
  dateIsBefore,
  timeExtractor,
} from "@/utils/utils";
import { useCallback, useEffect, useReducer, useState } from "react";
import { toast } from "react-hot-toast";
import { bookCar } from "@/services/cars";
import { IBookedCar } from "@/types/api_index";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa";

export function BookingDialog({ open, setOpen, car }: BookingDialogProps) {
  const schema = z.object({
    askprice: z.coerce.number().min(1, { message: "Ask price is required." }),
    bookingfromdate: z
      .string()
      .min(1, { message: "Booking from date & time is required." }),
    bookingtodate: z
      .string()
      .min(1, { message: "Booking to date & time is required." }),
  });
  // .refine((data) => new Date(data.bookingfromdate) < new Date(), {
  //   path: ["bookingfromdate"],
  //   message: "Date and time cannot before current datetime",
  // })
  // .refine((data) => new Date(data.bookingtodate) < new Date(), {
  //   path: ["bookingtodate"],
  //   message: "Date and time cannot before current datetime",
  // });
  // .refine(
  //   (data) =>
  //     new Date(data.bookingtodate) > new Date(car.data.available_to_date),
  //   {
  //     path: ["bookingtodate"],
  //     message: "Your selected to date is after availability date.",
  //   },
  // );
  // .superRefine((val, ctx) => {
  //   const timeNow = new Date();
  //   const fromDBDate = new Date(
  //     dateFormatterGMT(car.data.available_from_date),
  //   );
  //   const toDBDate = new Date(dateFormatterGMT(car.data.available_to_date));
  //   const bookingFromDate = new Date(val.bookingfromdate);
  //   const bookingToDate = new Date(val.bookingtodate);
  //   if (dateIsBefore(bookingFromDate, timeNow) === true) {
  //     setError("bookingfromdate", {
  //       message: "Date and time cannot before current datetime",
  //     });
  //   }
  //   if (dateIsBefore(bookingFromDate, fromDBDate) === true) {
  //     setError("bookingfromdate", {
  //       message: "Your selected from date is before availability date.",
  //     });
  //   }
  //   if (dateIsBefore(bookingToDate, timeNow) === true) {
  //     setError("bookingtodate", {
  //       message: "Date and time cannot before current datetime",
  //     });
  //   }
  //   if (dateIsAfter(bookingToDate, toDBDate) === true) {
  //     setError("bookingtodate", {
  //       message: "Your selected to date is after availability date.",
  //     });
  //   }
  //   if (dateIsBefore(bookingFromDate, bookingToDate) === false) {
  //     setError("root", {
  //       message: "Booking FROM datetime cannot after booking UNTIL datetime.",
  //     });
  //   }
  // });
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
  const [bookingToDateError, setBookingToDateError] = useState<
    string | undefined
  >();
  const [bookingToDateError2, setBookingToDateError2] = useState<
    string | undefined
  >();
  const [bookingFromDateError, setBookingFromDateError] = useState<
    string | undefined
  >();
  const [bookingFromDateError2, setBookingFromDateError2] = useState<
    string | undefined
  >();
  const [bookingRootDateError, setBookingRootDateError] = useState<
    string | undefined
  >();

  const validateFromTimeNow = (data: FormFields) => {
    const timeNow = new Date();
    const bookingFromDate = new Date(data.bookingfromdate);
    var isValidDateNow = false;

    if (dateIsBefore(bookingFromDate, timeNow) === true) {
      setBookingFromDateError("Date and time cannot before current datetime");
      isValidDateNow = false;
    } else {
      setBookingFromDateError(undefined);
      isValidDateNow = true;
    }

    return isValidDateNow;
  };

  const validateFromTimeDB = (data: FormFields) => {
    const bookingFromDate = new Date(data.bookingfromdate);
    const fromDBDate = new Date(dateFormatterGMT(car.data.available_from_date));
    var isValidDateFrom = false;

    if (dateIsBefore(bookingFromDate, fromDBDate) === true) {
      setBookingFromDateError2(
        "Your selected from date is before availability date.",
      );
      isValidDateFrom = false;
    } else {
      setBookingFromDateError2(undefined);
      isValidDateFrom = true;
    }

    return isValidDateFrom;
  };

  const validateToTimeNow = (data: FormFields) => {
    const timeNow = new Date();
    const bookingToDate = new Date(data.bookingtodate);
    var isValidDateNow = false;

    if (dateIsBefore(bookingToDate, timeNow) === true) {
      setBookingToDateError("Date and time cannot before current datetime");
      isValidDateNow = false;
    } else {
      setBookingToDateError(undefined);
      isValidDateNow = true;
    }

    return isValidDateNow;
  };

  const validateToTimeDB = (data: FormFields) => {
    const bookingToDate = new Date(data.bookingtodate);
    const toDBDate = new Date(dateFormatterGMT(car.data.available_to_date));
    var isValidDateTo = false;

    if (dateIsAfter(bookingToDate, toDBDate) === true) {
      setBookingToDateError2(
        "Your selected to date is after availability date.",
      );
      isValidDateTo = false;
    } else {
      setBookingToDateError2(undefined);
      isValidDateTo = true;
    }

    return isValidDateTo;
  };

  const validateTo = (data: FormFields) => {
    const timeNow = new Date();
    const bookingToDate = new Date(data.bookingtodate);
    const toDBDate = new Date(dateFormatterGMT(car.data.available_to_date));
    var isValidDateNow = false;
    var isValidDateTo = false;

    if (dateIsBefore(bookingToDate, timeNow) === true) {
      setBookingToDateError("Date and time cannot before current datetime");
      isValidDateNow = false;
    } else {
      setBookingToDateError(undefined);
      isValidDateNow = true;
    }
    if (dateIsAfter(bookingToDate, toDBDate) === true) {
      setBookingToDateError(
        "Your selected to date is after availability date.",
      );
      isValidDateTo = false;
    } else {
      setBookingToDateError(undefined);
      isValidDateTo = true;
    }

    if (isValidDateNow === true && isValidDateTo === true) {
      return true;
    } else {
      return false;
    }
  };

  const validateToFrom = (data: FormFields) => {
    const bookingFromDate = new Date(data.bookingfromdate);
    const bookingToDate = new Date(data.bookingtodate);
    var isValidFromToDate = false;

    if (dateIsBefore(bookingFromDate, bookingToDate) === false) {
      setBookingRootDateError(
        "Booking FROM datetime cannot after booking UNTIL datetime.",
      );
      isValidFromToDate = false;
    } else {
      setBookingRootDateError(undefined);
      isValidFromToDate = true;
    }

    return isValidFromToDate;
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const fromDateNowValidation = validateFromTimeNow(data);
    const fromDateDBValidation = validateFromTimeDB(data);
    const toDateNowValidation = validateToTimeNow(data);
    const toDateDBValidation = validateToTimeDB(data);
    const toFromValidation = validateToFrom(data);

    if (
      fromDateNowValidation === true &&
      fromDateDBValidation === true &&
      toDateNowValidation === true &&
      toDateDBValidation === true &&
      toFromValidation === true
    ) {
      try {
        const submitBookingData: IBookedCar = await bookCar({
          car_id: car.data.id,
          bargain_amount: data.askprice.toString(),
          rent_from_date: dateFormatterBooking(data.bookingfromdate),
          rent_to_date: dateFormatterBooking(data.bookingtodate),
        });

        if (submitBookingData.status === "ok") {
          await resetAllFieldAndError();
          await toast.success(
            "Your booking is successful! We are letting the host know.",
            {
              duration: 2000,
            },
          );
          await toast.success("Navigating to My Booking page.", {
            duration: 3000,
            icon: <FaLocationArrow className="animate-pulse" />,
          });
        } else {
          toast.error("Something went wrong! Please try again.");
        }
      } catch (error) {
        toast.error("Something went wrong! Please try again.");
      }
      console.log("Can call api");
      // dateFormatterBooking(data.bookingfromdate);
      // dateFormatterBooking(data.bookingtodate);
    } else {
      toast.error(
        "Something went wrong! Please ensure all warning are fulfilled and try again.",
      );
    }

    // await validating(data);
    // await submitBooking();
  };

  const validating = async (data: FormFields) => {
    const timeNow = new Date();
    const fromDBDate = new Date(dateFormatterGMT(car.data.available_from_date));
    const toDBDate = new Date(dateFormatterGMT(car.data.available_to_date));
    const bookingFromDate = new Date(data.bookingfromdate);
    const bookingToDate = new Date(data.bookingtodate);
    if (dateIsBefore(bookingFromDate, timeNow) === true) {
      setBookingFromDateError("Date and time cannot before current datetime");
    } else {
      setBookingFromDateError(undefined);
    }
    if (dateIsBefore(bookingFromDate, fromDBDate) === true) {
      setBookingFromDateError(
        "Your selected from date is before availability date.",
      );
    } else {
      setBookingFromDateError(undefined);
    }
    if (dateIsBefore(bookingToDate, timeNow) === true) {
      setBookingToDateError("Date and time cannot before current datetime");
    } else {
      setBookingToDateError(undefined);
    }
    if (dateIsAfter(bookingToDate, toDBDate) === true) {
      setBookingToDateError(
        "Your selected to date is after availability date.",
      );
    } else {
      setBookingToDateError(undefined);
    }
    if (dateIsBefore(bookingFromDate, bookingToDate) === false) {
      setBookingToDateError(
        "Booking FROM datetime cannot after booking UNTIL datetime.",
      );
    } else {
      setBookingRootDateError(undefined);
    }
  };

  const submitBooking = async () => {
    if (
      bookingFromDateError === undefined &&
      bookingToDateError === undefined &&
      bookingRootDateError === undefined
    ) {
      console.log("Form is valid, can proceed");
    } else {
      console.log("Form is not valid, cannot proceed");
    }
  };

  const resetAllFieldAndError = () => {
    setOpen(false);
    resetField("bookingfromdate");
    resetField("bookingtodate");
    resetField("askprice");
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent
        className="rounded-[20px] max-sm:w-[350px]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="flex items-start">
            <div
              className="flex w-full justify-end"
              onClick={resetAllFieldAndError}
            >
              <CgClose />
            </div>
            <DialogTitle className="text-lg font-bold sm:text-xl">
              Book this car
            </DialogTitle>
            <DialogDescription className="text-left max-sm:text-xs">
              You can bargain the price as a guest. But it's depends on the host
              to accept or bargain back.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2">
            <div className="rounded-lg bg-slate-100 p-4 max-sm:py-2">
              <div className="font-bold max-sm:text-sm">
                Booking Description
              </div>
              <h2 className="text-sm max-sm:text-xs">
                <span className="font-bold">Car name :</span>{" "}
                {car.data.car_name}
              </h2>
              <div className="text-sm max-sm:text-xs">
                <span className="font-bold">Color :</span> {car.data.color}
              </div>
              <div className="text-sm max-sm:text-xs">
                <span className="font-bold">Location :</span>{" "}
                {car.data.location}
              </div>
              <div>
                <h2 className="leading-2 mt-4 font-bold max-sm:text-sm max-sm:leading-none">
                  Owner Ask Price
                </h2>
                <div className="flex items-end">
                  <h2 className="text-2xl font-extrabold max-sm:text-lg">
                    RM {car.data.price}
                  </h2>
                  <h2 className="mb-[2px] ml-1 font-bold tracking-tighter text-brandprimary max-sm:text-sm">
                    / day
                  </h2>
                </div>
              </div>
            </div>
            <div className="my-5 flex flex-col gap-2 max-sm:my-3">
              <div>
                <h2 className="text-lg font-bold max-sm:text-sm">
                  Enter your ask price
                </h2>
                <div className="mt-2 flex items-center gap-3">
                  <h2 className="ml-2 text-xl font-extrabold max-sm:text-base">
                    RM
                  </h2>
                  <input
                    {...register("askprice")}
                    type="number"
                    id="askprice"
                    name="askprice"
                    className="signupInput text-lg font-bold max-sm:h-10 max-sm:text-base"
                  />
                </div>
                {errors?.askprice && (
                  <p className="signUpError">{errors.askprice.message}</p>
                )}
              </div>
              <div className="mt-3">
                <h2 className="text-lg font-bold max-sm:text-sm">
                  Select booking date & time
                </h2>
                <div className="mt-2 flex flex-col items-center gap-3">
                  <div className="w-full">
                    <h2 className="text-md font-bold max-sm:text-xs">From</h2>
                    <input
                      {...register("bookingfromdate")}
                      type="datetime-local"
                      id="bookingfromdate"
                      name="bookingfromdate"
                      className="signupInput text-md font-semibold max-sm:h-10 max-sm:text-base"
                      min={dateFormatterGMT(car.data.available_from_date)}
                      max={dateFormatterGMT(car.data.available_to_date)}
                    />
                    {errors?.bookingfromdate && (
                      <p className="signUpError">
                        {errors.bookingfromdate.message}
                      </p>
                    )}
                    {bookingFromDateError && (
                      <p className="signUpError">{bookingFromDateError}</p>
                    )}
                    {bookingFromDateError2 && (
                      <p className="signUpError">{bookingFromDateError2}</p>
                    )}
                  </div>
                  <div className="w-full">
                    <h2 className="text-md font-bold max-sm:text-xs">Until</h2>
                    <input
                      {...register("bookingtodate")}
                      type="datetime-local"
                      id="bookingtodate"
                      name="bookingtodate"
                      className="signupInput text-md font-semibold max-sm:h-10 max-sm:text-base"
                      min={dateFormatterGMT(car.data.available_from_date)}
                      max={dateFormatterGMT(car.data.available_to_date)}
                    />
                    {errors?.bookingtodate && (
                      <p className="signUpError">
                        {errors.bookingtodate.message}
                      </p>
                    )}
                    {bookingToDateError && (
                      <p className="signUpError">{bookingToDateError}</p>
                    )}
                    {bookingToDateError2 && (
                      <p className="signUpError">{bookingToDateError2}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {errors?.root && (
              <p className="signUpError text-left">{errors.root.message}</p>
            )}
            {bookingRootDateError && (
              <p className="pb-1 pl-1 text-[13px] leading-none text-red-500">
                {bookingRootDateError}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              //   onClick={() => {
              //     handleSubmit(onSubmit);
              //   }}
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-brandprimary font-extrabold"
            >
              {isSubmitting ? "Submitting..." : "Submit Booking"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
//   if (dateIsBefore(bookingFromDate, timeNow) === true) {
//     setError("bookingfromdate", {
//       message: "Date and time cannot before current datetime",
//     });
//   }
//   if (dateIsBefore(bookingFromDate, fromDBDate) === true) {
//     setError("bookingfromdate", {
//       message: "Your selected from date is before availability date.",
//     });
//   }
//   if (dateIsBefore(bookingToDate, timeNow) === true) {
//     setError("bookingtodate", {
//       message: "Date and time cannot before current datetime",
//     });
//   }
//   if (dateIsAfter(bookingToDate, toDBDate) === true) {
//     setError("bookingtodate", {
//       message: "Your selected to date is after availability date.",
//     });
//   }
//   if (dateIsBefore(bookingFromDate, bookingToDate) === false) {
//     setError("root", {
//       message: "Booking FROM datetime cannot after booking UNTIL datetime.",
//     });
//   }
//   Do the same this as above
//   if (dateIsBefore(bookingToDate, bookingFromDate) === true) {
//      setError("root", {
//        message: "Booking UNTIL datetime cannot before booking FROM datetime.",
//      });
//   }
//   await new Promise((resolve) => setTimeout(resolve, 800));
