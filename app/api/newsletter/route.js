import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }
    return NextResponse.json({
      success: true,
      message: `Subscribed ${email} to Playstate Field Dispatch!`,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}
