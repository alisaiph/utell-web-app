import React from "react";
import { getBookingsByUserId } from "../../_lib/data-service";
import BookingList from "../../_components/BookingList";
import getServerSession from "../../_lib/get-session";

export default async function page() {
  const session = await getServerSession();
  const { id } = session?.user;

  const allBookings = await getBookingsByUserId(id);

  return (
    <>
      <h2 className="text-xl font-semibold">Your bookings</h2>

      <table className="text-left border-collapse">
        <tbody>
          <tr>
            <th></th>
            <th>Room</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Guests</th>
            <th>Extras Price</th>
            <th>Total Price</th>
            <th>Status</th>
          </tr>

          {allBookings?.map((booking) => (
            <BookingList booking={booking} key={booking.id} />
          ))}
        </tbody>
      </table>
    </>
  );
}
