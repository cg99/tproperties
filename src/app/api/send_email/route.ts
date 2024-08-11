import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const { to, subject, text } = await request.json();

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: parseInt(process.env.MAILTRAP_PORT!, 10),
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS,
        },
    });

    try {
        // Send email
        await transporter.sendMail({
            from: `"SaaS App" <noreply@yourapp.com>`, // sender address
            to, // recipient address
            subject, // Subject line
            text, // plain text body
        });

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Error sending email', details: error.message }, { status: 500 });
    }
}
