import { PendingPaymentStatusBadgeProps } from "@/types";
import React from "react";

const PendingPaymentStatusBadge = ({
  booking,
}: PendingPaymentStatusBadgeProps) => {
  if (booking.bargain_status_id === 2 || booking.bargain_status_id === 4) {
    // if(booking.b)
  } else {
    return <></>;
  }
};

export default PendingPaymentStatusBadge;
