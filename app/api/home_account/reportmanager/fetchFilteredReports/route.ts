import { sql } from '@vercel/postgres';
import { ITEMS_PER_PAGE } from '@/app/lib/data';
import { ReportsTable } from '@/app/lib/definitions';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const reports = await sql<ReportsTable>`
      SELECT
        reportid,
        reportname,
        description,
        date_concept,
        to_char(date_from, 'YYYY-MM-DD') ||' to '||to_char(date_to, 'YYYY-MM-DD') as period,
        status,
        tags,
         to_char(updated, 'YYYY-MM-DD hh:mm:ss') as last_updated
      FROM reports
      WHERE 
        reports.reportname ILIKE ${`%${query}%`} OR
        reports.description ILIKE ${`%${query}%`} OR
        reports.date_concept ILIKE ${`%${query}%`} OR
         to_char(reports.date_from, 'YYYY-MM-DD') ||' - '||to_char(reports.date_to, 'YYYY-MM-DD') ILIKE ${`%${query}%`} OR
        reports.status ILIKE ${`%${query}%`} OR
       reports.tags ILIKE ${`%${query}%`} OR
                    to_char(reports.updated, 'YYYY-MM-DD hh:mm:ss') ILIKE ${`%${query}%`}
      ORDER BY reportid DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return NextResponse.json(reports.rows);
  } catch (error) {
    console.error('Database error:', error); // Log the error to the console
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}