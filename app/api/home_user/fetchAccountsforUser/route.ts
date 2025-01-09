import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { auth } from '@/auth';

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const useremail = session.user.email;

    const result = await sql`
      SELECT accountid, accountname, billing, datasources, lastupdated, currencies, file, users
      FROM accounts
      WHERE users @> ${`[{"email": "${useremail}"}]`}
    `;

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Database Error: Failed to fetch accounts:', error);
    return NextResponse.json({ error: 'Database Error: Failed to fetch accounts' }, { status: 500 });
  }
}