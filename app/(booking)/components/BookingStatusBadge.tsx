import React from "react";

interface BookingStatusBadgeProps {
  badgeID: number;
  badgeType: string;
}

const BookingStatusBadge = ({
  badgeID,
  badgeType,
}: BookingStatusBadgeProps) => {
  switch (badgeID) {
    //Pending
    case 0: {
      return (
        <h3 className="text-pendingblue border-pendingblue mt-1 h-max w-max rounded-lg border-2 px-3 text-xl font-semibold">
          Pending
        </h3>
      );
      break;
    }
    //Bargaining
    case 1: {
      return (
        <h3 className="text-bargainingyellow border-bargainingyellow mt-1 h-max w-max rounded-lg border-2 px-3 text-xl font-semibold">
          Bargaining
        </h3>
      );
    }
    //Host Accepted
    case 2: {
      return (
        <h3 className="text-hostguestacceptedgreen border-hostguestacceptedgreen mt-1 h-max w-max rounded-lg border-2 px-3 text-xl font-semibold">
          Host Accepted
        </h3>
      );
    }
    //Host Rejected
    case 3: {
      return (
        <h3 className="text-hostguestrejectedred border-hostguestrejectedred mt-1 h-max w-max rounded-lg border-2 px-3 text-xl font-semibold">
          Host Rejected
        </h3>
      );
    }
    //Guest Accepted
    case 4: {
      return (
        <h3 className="text-hostguestacceptedgreen border-hostguestacceptedgreen mt-1 h-max w-max rounded-lg border-2 px-3 text-xl font-semibold">
          Guest Accepted
        </h3>
      );
    }
    //Guest Rejected
    case 5: {
      return (
        <h3 className="text-hostguestrejectedred border-hostguestrejectedred mt-1 h-max w-max rounded-lg border-2 px-3 text-xl font-semibold">
          Guest Rejected
        </h3>
      );
    }
    //Booking Paid
    case 6: {
      return (
        <h3 className="text-bookingpaidgreen border-bookingpaidgreen mt-1 h-max w-max rounded-lg border-2 px-3 text-xl font-semibold">
          Booking Paid
        </h3>
      );
    }
    case 7: {
      return (
        <h3 className="text-pendingpaymentblue border-pendingpaymentblue mt-1 h-max w-max rounded-lg border-2 px-3 text-xl font-semibold">
          Pending Payment
        </h3>
      );
    }
    case -1: {
      return <></>;
    }
    default: {
      return <></>;
    }
  }
};

export default BookingStatusBadge;
