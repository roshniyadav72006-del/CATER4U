import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Booking from "@/models/Booking";

export async function GET() {
  try {
    await connectDB();

    const totalBookings = await Booking.countDocuments();

    const pendingBookings = await Booking.countDocuments({
      status: "Pending",
    });

    const confirmedBookings = await Booking.countDocuments({
      status: "Confirmed",
    });

    const cancelledBookings = await Booking.countDocuments({
      status: "Cancelled",
    });

    const completedBookings = await Booking.countDocuments({
      status: "Completed",
    });

    // Total Revenue (Completed bookings only)
    const revenueData = await Booking.aggregate([
      { $match: { status: "Completed" } },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalPrice" }, // ✅ correct field
        },
      },
    ]);

    const totalRevenue = revenueData[0]?.total || 0;

    // Monthly Booking Data
    const monthlyData = await Booking.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          bookings: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return NextResponse.json({
      totalBookings,
      pendingBookings,
      confirmedBookings,
      cancelledBookings,
      completedBookings,
      totalRevenue,
      monthlyData,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}
