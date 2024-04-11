import { Button } from "@/components/ui/button";
import { ILoginJWTData, IMyBookingDetail } from "@/types/api_index";
import React from "react";
import Cookies from "js-cookie";
import { FaInfoCircle } from "react-icons/fa";
import { parse } from "path";

interface BookingAcceptRejectProps {
  booking: IMyBookingDetail;
  jwttoken?: string;
  userlogingdata?: string;
}

const BookingAcceptReject: React.FC<BookingAcceptRejectProps> = ({
  booking,
  jwttoken,
  userlogingdata,
}) => {
  if (userlogingdata === undefined) {
    return (
      <div className="mt-4">
        <div className="flex justify-start gap-2">
          <FaInfoCircle className="text-xl text-red-500" />
          <h2 className="mb-2 text-sm text-red-500">
            Something went wrong! Please re-login before accept or reject.
          </h2>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-1 justify-center">
            <Button
              disabled
              variant={"outline"}
              className="text-md h-12 w-full rounded-lg border-2 border-red-500 bg-white font-bold text-red-500 hover:bg-red-200 hover:text-red-500"
            >
              Reject
            </Button>
          </div>
          <div className="flex flex-1 justify-center">
            <Button
              disabled
              className="text-md h-12 w-full rounded-lg bg-green-500 font-bold text-white shadow-none hover:bg-green-400"
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    const userLoginCookies: ILoginJWTData = JSON.parse(userlogingdata);

    if (
      booking.data.ori_bargain_status_id === 0 &&
      booking.data.last_bargain_user === userLoginCookies.data?.user.id
    ) {
      //First Rent Request and Last Bargain ID is Requestor
      return <></>;
    } else if (
      booking.data.ori_bargain_status_id === 1 &&
      booking.data.last_bargain_user === userLoginCookies.data?.user.id
    ) {
      //Bargaining with owner and Last Bargain ID is Requestor
      return <></>;
    } else if (booking.data.ori_bargain_status_id === 2) {
      //Host Accepted bargain price, show payment
      return (
        <div className="mt-4">
          <div className="flex flex-row items-end justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-slate-500">Total :</h3>
              <h1 className="text-2xl font-extrabold">
                RM{" "}
                {parseInt(booking.data.last_bargain_amount) *
                  booking.data.days_of_rental}
              </h1>
              <div className="text-sm font-bold italic text-slate-400">
                RM {parseInt(booking.data.last_bargain_amount)} x{" "}
                {booking.data.days_of_rental} day(s)
              </div>
            </div>

            <Button className="text-md h-12 w-40 rounded-lg bg-brandprimary font-bold text-white hover:bg-brandprimary">
              Pay
            </Button>
          </div>
        </div>
      );
    } else if (booking.data.ori_bargain_status_id === 3) {
      //Host Rejected
      return <></>;
    } else if (booking.data.ori_bargain_status_id === 4) {
      //Guest Accepted bargain price, show payment
      return (
        <div className="mt-4">
          <div className="flex flex-row items-end justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-slate-500">Total :</h3>
              <h1 className="text-2xl font-extrabold">
                RM{" "}
                {parseInt(booking.data.last_bargain_amount) *
                  booking.data.days_of_rental}
              </h1>
              <div className="text-sm font-bold italic text-slate-400">
                RM {parseInt(booking.data.last_bargain_amount)} x{" "}
                {booking.data.days_of_rental} day(s)
              </div>
            </div>

            <Button className="text-md h-12 w-40 rounded-lg bg-brandprimary font-bold text-white hover:bg-brandprimary">
              Pay
            </Button>
          </div>
        </div>
      );
    } else if (booking.data.ori_bargain_status_id === 5) {
      //Guest Rejected
      return <></>;
    } else if (booking.data.ori_bargain_status_id === 6) {
      //Booking paid, business completed
      return <></>;
    } else {
      //All other state filtered, so show accept reject
      return (
        <div className="mt-4">
          {userLoginCookies?.data?.profile.address1}
          <div className="flex flex-row gap-2">
            <div className="flex flex-1 justify-center">
              <Button
                variant={"outline"}
                className="text-md h-12 w-full rounded-lg border-2 border-red-500 bg-white font-bold text-red-500 hover:bg-red-200 hover:text-red-500"
              >
                Reject
              </Button>
            </div>
            <div className="flex flex-1 justify-center">
              <Button className="text-md h-12 w-full rounded-lg bg-green-500 font-bold text-white shadow-none hover:bg-green-400">
                Accept
              </Button>
            </div>
          </div>
        </div>
      );
    }
  }
};

export default BookingAcceptReject;