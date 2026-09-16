import  { Resend } from "resend";



export async function sendEmail(to, subject, html) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to,
            subject,
            html,
        });
        return { success: true };
    } catch (error) {
        console.error("Failed to send email:", error);
        return { success: false };
    }
}