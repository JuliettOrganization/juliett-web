import { sql } from '@vercel/postgres';
import { ITEMS_PER_PAGE } from '@/app/lib/data';
import { ReportsTable } from '@/app/lib/definitions';
import { NextResponse } from 'next/server';
//import { useAccount } from '@/app/context/AccountContext';

const fieldMapping: { [key: string]: string } = {
  reportid: 'reportid',
  reportname: 'reportname',
  description: 'description',
  date_concept: 'date_concept',
  period: "to_char(date_from, 'YYYY-MM-DD') || ' to ' || to_char(date_to, 'YYYY-MM-DD')",
  status: 'status',
  tags: 'tags',
  last_updated: "to_char(updated, 'YYYY-MM-DD hh:mm:ss')",
  isscheduleractive: 'isscheduleractive'
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
 // const { accountid } = useAccount();
 const accountid = searchParams.get('accountid');

 const sort = searchParams.get('sort') || '';
 const sortField = sort ? sort.split(':')[0] : 'last_updated';

const sortOrder = sort ? sort.split(':')[1] : 'desc';
 const dbSortField = fieldMapping[sortField] || 'updated';


  if (!accountid) {
    return NextResponse.json({ error: 'Account ID is required' }, { status: 400 });
  }

  try {
    const reportsQuery = `
    SELECT
      reportid,
      reportname,
      description,
      date_concept,
      to_char(date_from, 'YYYY-MM-DD') || ' to ' || to_char(date_to, 'YYYY-MM-DD') as period,
      status,
      tags,
      to_char(updated, 'YYYY-MM-DD hh:mm:ss') as last_updated,
      isscheduleractive
    FROM reports
    WHERE accountid = $1
    AND (
      reportname ILIKE $2 OR
      description ILIKE $2 OR
      date_concept ILIKE $2 OR
      to_char(date_from, 'YYYY-MM-DD') || ' - ' || to_char(date_to, 'YYYY-MM-DD') ILIKE $2 OR
      status ILIKE $2 OR
      tags ILIKE $2 OR
      to_char(updated, 'YYYY-MM-DD hh:mm:ss') ILIKE $2
    )
    ORDER BY ${dbSortField} ${sortOrder === 'asc' ? 'ASC' : 'DESC'}
    LIMIT ${ITEMS_PER_PAGE} OFFSET $3
  `;

  // Log the query and parameters
  console.log('Executing query:', reportsQuery);
  console.log('Query parameters:', [accountid, `%${query}%`, offset]);

  const reports = await sql.query(reportsQuery, [accountid, `%${query}%`, offset]);
 
   // ${(sortField)} ${(sortOrder === 'asc' ? 'ASC' : 'DESC')}
    return NextResponse.json(reports.rows);
  } catch (error) {
    console.error('Database error:', error); // Log the error to the console
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}