import connectDB from "../../../../../lib/mongoose";
import Booking from "../../../../../models/Booking";
import { sendEmail } from "../../../../../lib/nodemailer";

export async function PUT(req, context) {
  try {
    await connectDB();

    // params ab context.params.id me hoga
    const { params } = context;
    const id = params?.id;

    if (!id) return Response.json({ error: "Booking ID not provided" }, { status: 400 });

    const { status } = await req.json();

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!booking)
      return Response.json({ error: "Booking not found" }, { status: 404 });

    // Email template
    const html = `
      <h2>Booking Status Updated</h2>
      <p>Hello ${booking.fullName},</p>
      <p>Your booking for <b>${booking.eventType}</b> on <b>${booking.eventDate}</b> is now:</p>
      <h3>${status}</h3>
      <p>Thank you for choosing Cater4U.</p>
    `;

    await sendEmail({
      to: booking.email,
      subject: "Booking Status Update",
      html,
    });

    return Response.json({ success: true, booking });
  } catch (err) {
    console.error("Update status error:", err);
    return Response.json({ error: "Failed to update status" }, { status: 500 });
  }
}