import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { reportData } = await request.json();

    // Replace with your actual SQL query to save the report data
    // await sql`
    //   INSERT INTO reports (data)
    //   VALUES (${JSON.stringify(reportData)})
    // `;

    return NextResponse.json({ message: 'Report saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving report:', error);
    return NextResponse.json({ error: 'Failed to save report' }, { status: 500 });
  }
}