import { verifyUser } from "@/lib/middleware/auth";
import Booking from "@/models/Booking";

export async function POST(req) {
  // 🔐 USER AUTH CHECK
  const auth = verifyUser(req);
  if (auth.error) {
    return Response.json(
      { message: auth.error },
      { status: 401 }
    );
  }

  const body = await req.json();

  const booking = await Booking.create({
    ...body,
    userId: auth.user.id // 👈 logged-in user ka data
  });

  return Response.json(booking, { status: 201 });
}
