import { Button } from "@/components/ui/button";
import { updateBargainingHost } from "@/services/booking";
import {
  ILoginJWTData,
  IMyBookingDetail,
  INormalApiResponse,
} from "@/types/api_index";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaInfoCircle } from "react-icons/fa";

interface HostingAcceptRejectProps {
  hosting: IMyBookingDetail;
  jwttoken?: string;
  userlogingdata?: string;
  ableToSave: boolean;
}

const HostingAcceptReject: React.FC<HostingAcceptRejectProps> = ({
  hosting,
  jwttoken,
  userlogingdata,
  ableToSave,
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isRejecting, setIsRejecting] = useState<boolean>(false);
  const [isAccepting, setIsAccepting] = useState<boolean>(false);

  const apiAcceptRejectSuccess = async (action: string) => {
    try {
      const acceptRejectBargain: INormalApiResponse =
        await updateBargainingHost({
          bargain_id: hosting.data.ori_bargain_id,
          action_type: action,
        });

      if (acceptRejectBargain.status === "success") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const acceptRejectAction = async (action: string) => {
    setIsSubmitting(true);
    if (action === "accept") {
      setIsAccepting(true);
      const acceptAction = await apiAcceptRejectSuccess(action);

      console.log(acceptAction);

      if (acceptAction === true) {
        toast.success(
          "You had accepted the booking bargain. We will let the guest know. Reloading page....",
          { duration: 2000 },
        );
        await new Promise((resolve) => setTimeout(resolve, 3000));
        await window.location.reload();
      } else {
        toast.error(
          "Something went wrong accepting this bargain, Please try again.",
          { duration: 2000 },
        );
      }
      // await new Promise((resolve) => setTimeout(resolve, 3000));
    } else if (action === "reject") {
      setIsRejecting(true);
      const rejectAction = await apiAcceptRejectSuccess(action);

      if (rejectAction === true) {
        toast.success("You had rejected the booking bargain. Reloading...", {
          duration: 2000,
        });
        await new Promise((resolve) => setTimeout(resolve, 3000));
        await window.location.reload();
      } else {
        toast.error(
          "Something went wrong rejecting this bargain, Please try again.",
          { duration: 2000 },
        );
      }
      // await new Promise((resolve) => setTimeout(resolve, 3000));
    } else {
      //display errors
    }
    setIsAccepting(false);
    setIsRejecting(false);
    setIsSubmitting(false);
  };

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
      hosting.data.ori_bargain_status_id === 0 &&
      hosting.data.last_bargain_user === userLoginCookies.data?.user.id
    ) {
      //First Rent Request and Last Bargain ID is Requestor
      return <></>;
    } else if (
      hosting.data.ori_bargain_status_id === 1 &&
      hosting.data.last_bargain_user === userLoginCookies.data?.user.id
    ) {
      //Bargaining with owner and Last Bargain ID is Requestor
      return <></>;
    } else if (hosting.data.ori_bargain_status_id === 2) {
      return <></>;
    } else if (hosting.data.ori_bargain_status_id === 3) {
      //Host Rejected
      return <></>;
    } else if (hosting.data.ori_bargain_status_id === 4) {
      //Guest Accepted
      return <></>;
    } else if (hosting.data.ori_bargain_status_id === 5) {
      //Guest Rejected
      return <></>;
    } else if (hosting.data.ori_bargain_status_id === 6) {
      //Booking paid, business completed
      return <></>;
    } else {
      //All other state filtered, so show accept reject
      return (
        <div className="mt-4 max-md:px-2">
          <div className="flex flex-row gap-2">
            <div className="flex flex-1 justify-center">
              <Button
                disabled={isSubmitting || ableToSave}
                type="submit"
                variant={"outline"}
                className="text-md h-12 w-full rounded-lg border-2 border-red-500 bg-white font-bold text-red-500 hover:bg-red-200 hover:text-red-500"
                onClick={() => {
                  acceptRejectAction("reject");
                }}
              >
                {isRejecting ? (
                  <div className="flex flex-row items-center justify-center gap-2">
                    <AiOutlineLoading3Quarters className="animate-spin" />{" "}
                    <div>Rejecting...</div>
                  </div>
                ) : (
                  <div>Reject</div>
                )}
              </Button>
            </div>
            <div className="flex flex-1 justify-center">
              <Button
                disabled={isSubmitting || ableToSave}
                type="submit"
                className="text-md h-12 w-full rounded-lg bg-green-500 font-bold text-white shadow-none hover:bg-green-400"
                onClick={() => {
                  acceptRejectAction("accept");
                }}
              >
                {isAccepting ? (
                  <div className="flex flex-row items-center justify-center gap-2">
                    <AiOutlineLoading3Quarters className="animate-spin" />{" "}
                    <div>Accepting...</div>
                  </div>
                ) : (
                  <div>Accept</div>
                )}
              </Button>
            </div>
          </div>
        </div>
      );
    }
  }
};

export default HostingAcceptReject;
