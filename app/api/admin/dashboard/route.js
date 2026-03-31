import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongoose";
import Booking from "../../../../models/Booking";

export async function GET() {
  try {
    await connectDB();

    // ✅ EXISTING LOGIC (UNCHANGED)
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

    // ✅ Total Revenue (Completed only)
    const revenueData = await Booking.aggregate([
      { $match: { status: "Completed" } },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalRevenue = revenueData[0]?.total || 0;

    // ✅ Monthly Booking Count
    const monthlyData = await Booking.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          bookings: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    // ✅ Category wise (Wedding / Birthday)
    const categoryData = await Booking.aggregate([
      {
        $group: {
          _id: "$eventType",
          count: { $sum: 1 },
        },
      },
    ]);

    // ✅ Today events (Active)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayBookings = await Booking.countDocuments({
      createdAt: { $gte: today },
    });
    return NextResponse.json({
      totalBookings,
      pendingBookings,
      confirmedBookings,
      cancelledBookings,
      completedBookings,
      totalRevenue,
      monthlyData,

      // ✅ NEW DATA
      categoryData,
      todayBookings,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}