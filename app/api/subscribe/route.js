import { NextResponse } from 'next/server';

// Set GOOGLE_SHEETS_WEBHOOK_URL in your Vercel environment variables.
// Optionally also set MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID, MAILCHIMP_DC to enable Mailchimp.

export async function POST(request) {
  const { email } = await request.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const apiKey    = process.env.MAILCHIMP_API_KEY;
  const listId    = process.env.MAILCHIMP_LIST_ID;
  const dc        = process.env.MAILCHIMP_DC;

  let saved = false;

  // Google Sheets via Apps Script webhook
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      saved = true;
    } catch (err) {
      console.error('[Bristol] Google Sheets webhook error:', err);
    }
  }

  // Mailchimp (optional, can be added later)
  if (apiKey && listId && dc) {
    try {
      const url  = `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`;
      const res  = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `apikey ${apiKey}`,
        },
        body: JSON.stringify({ email_address: email, status: 'subscribed' }),
      });
      const data = await res.json();
      if (res.ok || data.title === 'Member Exists') saved = true;
    } catch (err) {
      console.error('[Bristol] Mailchimp error:', err);
    }
  }

  if (!saved) {
    console.log(`[Bristol] Email signup (no destination configured): ${email}`);
  }

  return NextResponse.json({ ok: true });
}
