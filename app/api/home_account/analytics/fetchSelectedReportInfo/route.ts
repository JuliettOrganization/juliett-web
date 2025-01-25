import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';



export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
 const accountid = searchParams.get('accountid');
 const reportid = searchParams.get('reportid');


  if (!accountid) {
    return NextResponse.json({ error: 'Account ID is required' }, { status: 400 });
  }

  try {
    const reportsQuery = `
    SELECT
      reportid, useremail, reportname, description, updated, od_concept, 
         od_filtering, amounts, 
          to_char(benchmark_date_from, 'YYYY-MM-DD') as benchmark_date_from, 
           to_char(benchmark_date_to, 'YYYY-MM-DD') as benchmark_date_to, 
         benchmark_period, currency, date_concept, 
         to_char(date_from, 'YYYY-MM-DD') as date_from, 
         to_char(date_to, 'YYYY-MM-DD') as date_to, 
         fields, is_custom_sql_active, selected_grouping_agency, 
         selected_grouping_geo_from, selected_grouping_geo_to, 
         selected_grouping_issuing, selected_grouping_marketing, 
         selected_grouping_operating, selected_grouping_values_agency, 
         selected_grouping_values_geo_from, selected_grouping_values_geo_to, 
         selected_grouping_values_issuing, selected_grouping_values_marketing, 
         selected_grouping_values_operating, sql_code, string_to_array(tags, ';') as tags, transaction_type
    FROM reports
    WHERE accountid = $1
    AND reportid = $2
    LIMIT 1
  `;

  // Log the query and parameters
  console.log('Executing query:', reportsQuery);
  console.log('Query parameters:', [accountid, reportid]);

  const reports = await sql.query(reportsQuery, [accountid, reportid]);
 
    return NextResponse.json(reports.rows);
  } catch (error) {
    console.error('Database error:', error); // Log the error to the console
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}