import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { reportid } = await request.json();

    if (!reportid) {
      return NextResponse.json({ error: 'Report ID is required' }, { status: 400 });
    }

    const query = `
      SELECT reportid, useremail, reportname, description, updated, od_concept, 
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
      WHERE reportid = $1
    `;
    const result = await sql.query(query, [reportid]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    const reportData = result.rows[0];
    return NextResponse.json(reportData, { status: 200 });
  } catch (error) {
    console.error('Error fetching report details:', error);
    return NextResponse.json({ error: 'Failed to fetch report details' }, { status: 500 });
  }
}