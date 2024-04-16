import { IMyBookingDetail, INormalApiResponse } from "@/types/api_index";
import { dateFormatterGMT } from "@/utils/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CarDetailsCarousel from "@/app/(car)/components/CarDetailsCarousel";
import BookingStatusBadge from "@/app/(booking)/components/BookingStatusBadge";
import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";
import { MdEventAvailable } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { bargainingCar } from "@/services/booking";
import HostingAcceptReject from "./HostingAcceptReject";
import Cookies from "js-cookie";

interface HostingDetailProps {
  hosting: IMyBookingDetail;
}

const HostingDetailListing: React.FC<HostingDetailProps> = ({ hosting }) => {
  const schema = z.object({
    bargainprice: z.coerce.number().min(1, { message: "Bargain is required." }),
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

  const listOfCarImages = [
    hosting.data?.car_main_pic ?? "",
    hosting.data?.car_image_one ?? "",
    hosting.data?.car_image_two ?? "",
    hosting.data?.car_image_three ?? "",
    hosting.data?.car_image_four ?? "",
  ];
  const fromDate = dateFormatterGMT(hosting.data.rent_from_date);
  const toDate = dateFormatterGMT(hosting.data.rent_to_date);
  const [ableToSave, setAbleToSave] = useState<boolean>(false);

  const handleSaveUpdateData: SubmitHandler<FormFields> = async (data) => {
    toast.loading("Saving....");
    if (
      parseInt(data.bargainprice.toString()) !==
      parseInt(hosting.data.last_bargain_amount.toString())
    ) {
      const updateBargainData: INormalApiResponse = await bargainingCar({
        bargain_id: parseInt(hosting.data.ori_bargain_id.toString()),
        bargain_amount: data.bargainprice.toString(),
      });

      if (updateBargainData.status === "success") {
        await toast.dismiss();
        await toast.success(
          "Your bargain price updated successfully! Reloading now...",
          {
            duration: 2000,
          },
        );
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await window.location.reload();
        resetField("bargainprice");
        reset();
        setAbleToSave(!ableToSave);
      } else {
        await toast.dismiss();
        await toast.error("Something went wrong! Please try again.");
      }
    } else if (
      parseInt(data.bargainprice.toString()) ===
      parseInt(hosting.data.last_bargain_amount.toString())
    ) {
      await toast.dismiss();
      await toast.success(
        "No bargain price change, because your new bargain price is similar to the previous bargain price.",
        {
          duration: 4000,
          icon: (
            <IoMdInformationCircleOutline className="w-24 animate-pulse text-2xl text-red-600" />
          ),
        },
      );
      resetField("bargainprice");
      reset();
      setAbleToSave(!ableToSave);
    } else {
      await toast.dismiss();
      setError("root", {
        message: "Something went wrong! Please try again later.",
      });
    }
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div>
        <CarDetailsCarousel carImages={listOfCarImages} />
      </div>
      <div className="w-[450px] max-sm:w-[350px]">
        <div className="my-4 flex w-full flex-row justify-between max-md:flex-col max-md:px-3">
          <div>
            <h2 className="text-3xl font-extrabold">
              {hosting.data?.car_name}
            </h2>
            <h3 className="mt-1 w-max rounded-lg border-2 px-3 text-lg font-semibold text-slate-400">
              {hosting.data?.car_plate}
            </h3>
            <h3 className="mt-1 w-max rounded-lg border-2 border-slate-400 px-3 text-lg font-semibold text-slate-500">
              Your Initial Price : RM {hosting.data.price}
            </h3>
          </div>
          <div className="flex flex-col md:items-end">
            <BookingStatusBadge
              badgeID={hosting.data.bargain_status_id}
              badgeType={hosting.data.ori_bargain_name}
            />
            {hosting.data.bargain_status_id === 2 ||
            hosting.data.bargain_status_id === 4 ? (
              <BookingStatusBadge badgeID={7} badgeType={"Pending Payment"} />
            ) : (
              <></>
            )}

            {/* */}
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 max-md:px-2">
          <div className="flex flex-col gap-1 rounded-2xl bg-slate-50 px-4 py-3 drop-shadow-sm">
            <div className="flex items-center justify-start gap-2">
              <IoLocationOutline className="text-2xl text-brandprimary" />
              <h2 className="text-xl font-bold text-brandprimary">Location</h2>
            </div>
            <div>{hosting.data.location}</div>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl bg-slate-50 px-4 py-3 drop-shadow-sm">
            <div className="flex items-center justify-start gap-2">
              <MdEventAvailable className="text-2xl text-brandprimary" />
              <h2 className="text-xl font-bold text-brandprimary">
                Rental Date
              </h2>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-md font-bold">
                From : <span className="text-md font-medium">{fromDate}</span>
              </h2>
              <h2 className="text-md font-bold">
                Until : <span className="text-md font-medium">{toDate}</span>
              </h2>
            </div>
          </div>
          <form onSubmit={handleSubmit(handleSaveUpdateData)}>
            <div className="flex flex-col gap-2 rounded-2xl bg-slate-50 px-4 py-3 drop-shadow-sm">
              <div className="flex items-center justify-start gap-2">
                <IoPricetagOutline className="text-2xl text-brandprimary" />
                <div className="flex w-full items-center justify-between">
                  <h2 className="text-xl font-bold text-brandprimary">
                    Bargaining Price
                  </h2>
                  {ableToSave === true ? (
                    <Button
                      type="submit"
                      variant="ghost"
                      disabled={isSubmitting}
                    >
                      <h2 className="text-md font-semibold text-green-400">
                        Save
                      </h2>
                    </Button>
                  ) : hosting.data.ori_bargain_status_id === 0 ||
                    hosting.data.ori_bargain_status_id === 1 ? (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setAbleToSave(!ableToSave);
                        // router.refresh();
                      }}
                    >
                      <h2 className="text-md font-semibold text-red-400">
                        Edit
                      </h2>
                    </Button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                {ableToSave === true ? (
                  <div>
                    <div className="flex items-center justify-between gap-2 px-2">
                      <h2 className="text-xl font-bold">RM</h2>
                      <input
                        {...register("bargainprice")}
                        type="number"
                        className="inputBasic"
                      />
                      <h2 className="w-14 text-sm font-bold text-brandprimary">
                        / day
                      </h2>
                    </div>
                    {errors?.bargainprice && (
                      <p className="signUpError">
                        {errors.bargainprice.message}
                      </p>
                    )}
                    {errors?.root && (
                      <p className="signUpError">{errors.root.message}</p>
                    )}
                  </div>
                ) : (
                  <h2 className="text-lg font-bold">
                    RM {hosting.data.last_bargain_amount}{" "}
                    <span className="text-sm font-bold text-brandprimary">
                      /day
                    </span>
                  </h2>
                )}
              </div>
            </div>
          </form>
        </div>
        <HostingAcceptReject
          hosting={hosting}
          jwttoken={Cookies.get("JWT_TOKEN")}
          userlogingdata={Cookies.get("USER_LOGIN_DATA")}
          ableToSave={ableToSave}
        />
      </div>
    </div>
  );
};

export default HostingDetailListing;
