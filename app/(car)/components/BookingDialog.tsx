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
  //   message: "Booking from date & time cannot before today.",
  // });
  // .refine(
  //   (data) =>
  //     new Date(data.bookingtodate) > new Date(car.data.available_to_date),
  //   {
  //     path: ["bookingtodate"],
  //     message: "Booking to date & time exceeded availability.",
  //   },
  // );

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
    const fromDate = new Date(car.data.available_from_date);
    const toDate = new Date(car.data.available_to_date);
    const bookingFromDate = new Date(data.bookingfromdate);
    const bookingToDate = new Date(data.bookingtodate);

    // if(){

    // }


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
      <DialogContent className="rounded-[20px] max-sm:w-[350px]">
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
        <div className="">
          <div className="rounded-lg bg-slate-100 p-4 max-sm:py-2">
            <div className="font-bold max-sm:text-sm">Booking Description</div>
            <h2 className="text-sm max-sm:text-xs">
              <span className="font-bold">Car name :</span> {car.data.car_name}
            </h2>
            <div className="text-sm max-sm:text-xs">
              <span className="font-bold">Color :</span> {car.data.color}
            </div>
            <div className="text-sm max-sm:text-xs">
              <span className="font-bold">Location :</span> {car.data.location}
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
                    // min={car.data.available_from_date}
                  />
                  {errors?.bookingfromdate && (
                    <p className="signUpError">
                      {errors.bookingfromdate.message}
                    </p>
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
                    min={car.data.available_from_date}
                    // max={car.data.available_to_date}
                  />
                  {errors?.bookingtodate && (
                    <p className="signUpError">
                      {errors.bookingtodate.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit(onSubmit)}
            className="w-full bg-brandprimary font-extrabold"
          >
            Submit Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
