import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const users = await sql`
      SELECT id, email FROM public.users order by email
    `;

    return NextResponse.json(users);
  } catch (error) {
    console.error('Database error:', error); // Log the error to the console
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

