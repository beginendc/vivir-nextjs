import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      whatsapp,
      destination,
      travelerType,
      pace,
      vibes,
      accommodation,
      timeline,
      specialRequest,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // 1. Save to Supabase
    const { error: supabaseError } = await supabase
      .from('quiz_leads')
      .insert([
        {
          name,
          email,
          whatsapp,
          destination,
          traveler_type: travelerType,
          pace,
          vibes,
          accommodation,
          timeline,
          special_request: specialRequest,
          status: 'new',
        },
      ]);

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
    }

    // 2. Send emails via Resend
    
    // To Agency
    const { error: agencyEmailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.RESEND_TO_EMAIL || 'hello@vivir.travel',
      subject: `✈️ New Trip Request — ${name} → ${destination}`,
      html: `
        <h2>New Trip Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>WhatsApp:</strong> ${whatsapp || 'N/A'}</p>
        <hr />
        <p><strong>Destination:</strong> ${destination}</p>
        <p><strong>Traveling:</strong> ${travelerType}</p>
        <p><strong>Pace:</strong> ${pace}</p>
        <p><strong>Vibes:</strong> ${vibes?.join(', ') || 'N/A'}</p>
        <p><strong>Accommodation:</strong> ${accommodation}</p>
        <p><strong>Timeline:</strong> ${timeline}</p>
        <p><strong>Special Request:</strong> ${specialRequest || 'None'}</p>
      `,
    });

    if (agencyEmailError) {
      console.error('Agency Email error:', agencyEmailError);
    }

    // To Client (Confirmation)
    const { error: clientEmailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      subject: `We're already dreaming up your trip, ${name}.`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
          <h2 style="font-family: serif; color: #b8860b;">Dear ${name},</h2>
          <p>Thank you for sharing your travel dreams with <strong>Vivir Travel</strong>.</p>
          <p>We've received your request for <strong>${destination}</strong> and our team is already curating a bespoke itinerary tailored to your preferences.</p>
          <p>You can expect to hear from us within 24 hours.</p>
          <br />
          <p>With anticipation,</p>
          <p><strong>The Vivir Travel Team</strong><br />
          hello@vivir.travel<br />
          <a href="https://vivir.travel">vivir.travel</a></p>
        </div>
      `,
    });

    if (clientEmailError) {
      console.error('Client Email error:', clientEmailError);
    }

    // 3. Post to GHL Webhook (optional)
    if (process.env.GHL_QUIZ_WEBHOOK_URL) {
      try {
        await fetch(process.env.GHL_QUIZ_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...body,
            source: 'Quiz Form',
            tags: ['quiz-lead', `dest-${destination?.toLowerCase().replace(/\s+/g, '-')}`],
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
