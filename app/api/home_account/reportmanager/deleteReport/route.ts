import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  try {
    const { reportid } = await request.json();

    if (!reportid) {
      return NextResponse.json({ error: 'Report ID is required' }, { status: 400 });
    }

    await sql`DELETE FROM reports WHERE reportid = ${reportid}`;
    revalidatePath('/home_account/reportmanager');

    return NextResponse.json({ message: 'Report deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Database Error: Failed to delete report:', error);
    return NextResponse.json({ error: 'Database Error: Failed to delete report' }, { status: 500 });
  }
}