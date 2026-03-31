import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/mongoose";
import Feedback from "../../../../../models/Feedback";
import { sendEmail } from "../../../../../lib/nodemailer";

// UPDATE (Response + Publish)
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return NextResponse.json(
        { error: "Feedback not found" },
        { status: 404 }
      );
    }

    // ✅ RESPONSE CASE
    if (body.response) {
      feedback.adminResponse = body.response;
      feedback.status = "published";

      // ✅ EMAIL SEND
      try {
        await sendEmail({
          to: feedback.email,
          subject: "Response to your feedback - Chandani Caterer's",
          html: `
            <h2>Hello ${feedback.name},</h2>
            <p>Thank you for your valuable feedback.</p>

            <p><strong>Your Feedback:</strong></p>
            <p>${feedback.comment}</p>

            <p><strong>Admin Response:</strong></p>
            <p>${body.response}</p>

            <br/>
            <p>Regards,<br/>Chandani Caterer's Team</p>
          `,
        });

        console.log("✅ Email sent successfully");
      } catch (emailError) {
        console.log("❌ Email failed:", emailError.message);
      }
    }

    // ✅ STATUS CHANGE (Publish/Unpublish)
    if (body.status) {
      feedback.status = body.status;
    }

    await feedback.save();

    return NextResponse.json(feedback);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    await Feedback.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}