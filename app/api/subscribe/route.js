import { NextResponse } from 'next/server';

// Mailchimp configuration — set these in your Vercel environment variables:
//   MAILCHIMP_API_KEY   — your Mailchimp API key (e.g. abc123-us14)
//   MAILCHIMP_LIST_ID   — the Audience ID for your list
//   MAILCHIMP_DC        — the datacenter suffix from your API key (e.g. us14)

export async function POST(request) {
  const { email } = await request.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const apiKey  = process.env.MAILCHIMP_API_KEY;
  const listId  = process.env.MAILCHIMP_LIST_ID;
  const dc      = process.env.MAILCHIMP_DC;

  // If Mailchimp is not yet configured, accept the email and log it.
  if (!apiKey || !listId || !dc) {
    console.log(`[Bristol] Email signup (Mailchimp not configured): ${email}`);
    return NextResponse.json({ ok: true });
  }

  const url  = `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`;
  const body = JSON.stringify({ email_address: email, status: 'subscribed' });

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `apikey ${apiKey}`,
    },
    body,
  });

  // 200 = new subscriber, 400 with "Member Exists" = already subscribed — both OK
  if (res.ok) return NextResponse.json({ ok: true });

  const data = await res.json();
  if (data.title === 'Member Exists') return NextResponse.json({ ok: true });

  console.error('[Bristol] Mailchimp error:', data);
  return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
}
