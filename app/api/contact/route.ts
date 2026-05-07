import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, destination, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // 1. Save to Supabase
    const { error: supabaseError } = await supabase
      .from('contact_leads')
      .insert([
        {
          name,
          email,
          destination,
          message,
        },
      ]);

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
    }

    // 2. Send email via Resend
    const { error: resendError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.RESEND_TO_EMAIL || 'hello@vivir.travel',
      subject: `New Contact Inquiry — ${name}`,
      html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Destination:</strong> ${destination || 'Not specified'}</p>
        <p><strong>Message:</strong> ${message || 'No message provided'}</p>
      `,
    });

    if (resendError) {
      console.error('Resend error:', resendError);
    }

    // 3. Post to GHL Webhook (optional)
    if (process.env.GHL_CONTACT_WEBHOOK_URL) {
      try {
        await fetch(process.env.GHL_CONTACT_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            destination,
            message,
            source: 'Contact Form',
            tags: ['contact-form'],
          }),
        });
      } catch (ghlError) {
        console.error('GHL Webhook error:', ghlError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
