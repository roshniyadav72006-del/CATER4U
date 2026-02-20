import Booking from "../../../models/Booking";
import { verifyAdmin } from "../../../lib/middleware/AdminSession";
import connectDB from "../../../lib/mongoose";
import { NextResponse } from "next/server";

async function getBookings() {
  await connectDB();
  return Booking.find().populate("userId").sort({ createdAt: -1 });
}

export default async function AdminBookingsPage() {
  const bookings = await getBookings();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">All Bookings</h1>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Customer</th>
              <th className="p-3">Email</th>
              <th className="p-3">Event Date</th>
              <th className="p-3">Guests</th>
              <th className="p-3">Status</th>
              <th className="p-3">Created</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-t">
                <td className="p-3">{b.userId?.name}</td>
                <td className="p-3">{b.userId?.email}</td>
                <td className="p-3">{new Date(b.eventDate).toLocaleDateString()}</td>
                <td className="p-3">{b.guests}</td>
                
                {/* Status Dropdown */}
                <td className="p-3">
                  <select
                    value={b.status}
                    onChange={async (e) => {
                      await fetch("/api/booking/status", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: b._id, status: e.target.value }),
                      });
                      window.location.reload();
                    }}
                    className="border rounded px-2 py-1"
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </td>

                <td className="p-3">{new Date(b.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
