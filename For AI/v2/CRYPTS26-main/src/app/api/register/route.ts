import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.email || !data.name || !data.class || !data.section || !data.events || data.events.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn("EMAIL_USER or EMAIL_PASS is not set in environment variables.");
      return NextResponse.json({ error: 'Server email configuration missing (EMAIL_USER / EMAIL_PASS).' }, { status: 500 });
    }

    // Configure nodemailer with environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const eventListString = data.events.join(', ');

    const htmlTemplate = `
      <div style="font-family: monospace; background: #02030a; color: #fff; padding: 30px; border: 1px solid #00f3ff;">
        <h2 style="color: #00f3ff; margin-bottom: 20px;">CRYPTS'26 // REGISTRATION_CONFIRMED</h2>
        <p style="color: #ccc;">A new operator has successfully enrolled in the matrix.</p>
        <div style="background: rgba(0,243,255,0.1); padding: 15px; border-left: 3px solid #00f3ff; margin: 20px 0;">
          <p><strong>OPERATOR:</strong> ${data.name}</p>
          <p><strong>CONTACT:</strong> ${data.email}</p>
          <p><strong>CLASS/SEC:</strong> ${data.class} - ${data.section}</p>
          <p><strong>MODULES:</strong> <span style="color: #ff00c1;">${eventListString}</span></p>
        </div>
        <p style="color: #888; font-size: 12px;">SYSTEM GENERATED MESSAGE &bull; OPG WORLD SCHOOL</p>
      </div>
    `;

    // 1. Send confirmation to participant
    await transporter.sendMail({
      from: `"CRYPTS'26 SYSTEM" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: `CRYPTS'26 - Enrollment Confirmed [${data.name}]`,
      html: htmlTemplate,
    });

    // 2. Send notification to organizers
    await transporter.sendMail({
      from: `"CRYPTS REGISTRATION" <${process.env.EMAIL_USER}>`,
      to: 'eeshaan.cryptsopg@gmail.com, shivan.cryptsopg@gmail.com',
      subject: `${data.name} - ${eventListString}`,
      html: htmlTemplate,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Registration API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to process registration' }, { status: 500 });
  }
}
