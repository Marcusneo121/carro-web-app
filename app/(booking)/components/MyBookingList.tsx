"use client";

import { IBooking, IMyBooking } from "@/types/api_index";
import BookingCarCard from "./BookingCarCard";

interface BookingListProps {
  bookings: IMyBooking[];
}

const MyBookingList: React.FC<BookingListProps> = ({ bookings }) => {
  return (
    <div>
      {bookings === undefined ? (
        <div>
          <h1>Error....</h1>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-10 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-4">
          {bookings.map((booking) => (
            <BookingCarCard key={booking.ori_bargain_id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingList;
