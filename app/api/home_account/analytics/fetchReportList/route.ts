import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';



export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
 const accountid = searchParams.get('accountid');

  if (!accountid) {
    return NextResponse.json({ error: 'Account ID is required' }, { status: 400 });
  }

  try {
    const reportsQuery = `
    SELECT
      reportid,
      reportname,
      updated 
    FROM reports
    WHERE accountid = $1
    AND
      reportname ILIKE $2 AND
      status ='result'
    
    ORDER BY reportname
    LIMIT 500 
  `;

  // Log the query and parameters
  console.log('Executing query:', reportsQuery);
  console.log('Query parameters:', [accountid, `%${query}%`]);

  const reports = await sql.query(reportsQuery, [accountid, `%${query}%`]);
 
    return NextResponse.json(reports.rows);
  } catch (error) {
    console.error('Database error:', error); // Log the error to the console
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}