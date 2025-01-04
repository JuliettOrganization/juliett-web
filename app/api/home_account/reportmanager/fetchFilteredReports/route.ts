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
        period,
        status,
        tags,
         to_char(updated, 'YYYY-MM-DD hh:mm:ss') as last_updated
      FROM master.report_manager
      WHERE 
        report_manager.reportname ILIKE ${`%${query}%`} OR
        report_manager.description ILIKE ${`%${query}%`} OR
        report_manager.date_concept ILIKE ${`%${query}%`} OR
        report_manager.period ILIKE ${`%${query}%`} OR
        report_manager.status ILIKE ${`%${query}%`} OR
        report_manager.tags ILIKE ${`%${query}%`} OR
                    to_char(report_manager.updated, 'YYYY-MM-DD hh:mm:ss') ILIKE ${`%${query}%`}
      ORDER BY reportid DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return NextResponse.json(reports.rows);
  } catch (error) {
    console.error('Database error:', error); // Log the error to the console
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}