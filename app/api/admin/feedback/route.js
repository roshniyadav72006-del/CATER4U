import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongoose";
import Feedback from "../../../../models/Feedback";

export async function GET(req) {
  try {
    await connectDB();

    // ✅ Get query params
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const status = searchParams.get("status");
    const rating = searchParams.get("rating");

    // ✅ Build query
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { service: { $regex: search, $options: "i" } },
        { comment: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      query.status = status;
    }

    if (rating) {
      query.rating = Number(rating);
    }

    // ✅ Filtered feedbacks
    const feedbacks = await Feedback.find(query).sort({ createdAt: -1 });

    // ✅ Overall stats (ALL feedbacks, not filtered)
    const allFeedbacks = await Feedback.find();

    const total = allFeedbacks.length;
    const published = allFeedbacks.filter(f => f.status === "published").length;
    const pending = allFeedbacks.filter(f => f.status === "pending").length;

    const avgRating =
      total === 0
        ? 0
        : (
            allFeedbacks.reduce((acc, f) => acc + f.rating, 0) / total
          ).toFixed(1);

    // ⭐ Rating Distribution
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    allFeedbacks.forEach((f) => {
      if (distribution[f.rating] !== undefined) {
        distribution[f.rating]++;
      }
    });

    return NextResponse.json({
      feedbacks,
      stats: {
        total,
        published,
        pending,
        avgRating,
        distribution,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}