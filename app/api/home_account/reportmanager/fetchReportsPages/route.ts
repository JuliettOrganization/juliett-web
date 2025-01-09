import { sql } from '@vercel/postgres';
import { ITEMS_PER_PAGE } from '@/app/lib/data';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';


  try {
    const result = await sql`
      SELECT
   COUNT(*)
      FROM reports
      WHERE 
        reports.reportname ILIKE ${`%${query}%`} OR
        reports.description ILIKE ${`%${query}%`} OR
        reports.date_concept ILIKE ${`%${query}%`} OR
         to_char(reports.date_from, 'YYYY-MM-DD') ||' - '||to_char(reports.date_to, 'YYYY-MM-DD') ILIKE ${`%${query}%`} OR
        reports.status ILIKE ${`%${query}%`} OR
        reports.tags ILIKE ${`%${query}%`} OR
                    to_char(reports.updated, 'YYYY-MM-DD hh:mm:ss') ILIKE ${`%${query}%`}
    
    `;
    const totalPages = Math.ceil(Number(result.rows[0].count) / ITEMS_PER_PAGE);
  

    return NextResponse.json(totalPages);
  } catch (error) {
    console.error('Database error:', error); // Log the error to the console
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}