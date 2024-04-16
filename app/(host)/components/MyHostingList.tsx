"use client";

import { IBooking, IMyBooking } from "@/types/api_index";
import HostingCarCard from "./HostingCarCard";
// import BookingCarCard from "./BookingCarCard";

interface HostingListProps {
  hostings: IMyBooking[];
}

const MyBookingList: React.FC<HostingListProps> = ({ hostings }) => {
  return (
    <div>
      {hostings === undefined ? (
        <div>
          <h1>Error....</h1>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-10 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-4">
          {hostings.map((hosting) => (
            <HostingCarCard key={hosting.ori_bargain_id} hosting={hosting} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingList;
