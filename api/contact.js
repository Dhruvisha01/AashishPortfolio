import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Only POST requests allowed" });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail", // or your provider
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: process.env.EMAIL_USER,
            subject: "New Contact Form Submission",
            html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
        });

        res.status(200).json({ message: "Message sent successfully!" });
    } catch (err) {
        console.error("Error sending email:", err);
        res.status(500).json({ error: "Failed to send message." });
    }
}
