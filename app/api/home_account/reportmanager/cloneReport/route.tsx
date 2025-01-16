import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '@/auth';

export async function POST(request: Request) {
  try {
    const { reportid } = await request.json();

    if (!reportid) {
        return NextResponse.json({ error: 'Report ID is required' }, { status: 400 });
      }

    const newReportId = uuidv4();
    
    // Ensure the reportid does not already exist
    const checkReportIdQuery = 'SELECT 1 FROM reports WHERE reportid = $1';
    const checkReportIdResult = await sql.query(checkReportIdQuery, [newReportId]);
    if (checkReportIdResult.rows.length > 0) {
      throw new Error('Report ID already exists');
    }

    const insertQuery = `
   INSERT INTO reports (
    reportid, useremail, reportname, status, tags, updated, description, od_concept, 
    od_filtering, amounts, benchmark_date_from, benchmark_date_to, 
    benchmark_period, currency, date_concept, date_from, date_to, 
    fields, is_custom_sql_active, selected_grouping_agency, 
    selected_grouping_geo_from, selected_grouping_geo_to, 
    selected_grouping_issuing, selected_grouping_marketing, 
    selected_grouping_operating, selected_grouping_values_agency, 
    selected_grouping_values_geo_from, selected_grouping_values_geo_to, 
    selected_grouping_values_issuing, selected_grouping_values_marketing, 
    selected_grouping_values_operating, sql_code, transaction_type, accountid
) 
SELECT 
    $1, useremail, reportname||' (cloned)', status, tags, NOW(), description, od_concept, 
    od_filtering, amounts, benchmark_date_from, benchmark_date_to, 
    benchmark_period, currency, date_concept, date_from, date_to, 
    fields, is_custom_sql_active, selected_grouping_agency, 
    selected_grouping_geo_from, selected_grouping_geo_to, 
    selected_grouping_issuing, selected_grouping_marketing, 
    selected_grouping_operating, selected_grouping_values_agency, 
    selected_grouping_values_geo_from, selected_grouping_values_geo_to, 
    selected_grouping_values_issuing, selected_grouping_values_marketing, 
    selected_grouping_values_operating, sql_code, transaction_type, accountid
FROM reports
WHERE reportid = $2;

    `;

    const insertValues = [
      newReportId,
      reportid,
    ];

    await sql.query(insertQuery, insertValues);
    console.log(sql.query(insertQuery, insertValues));
   
    // return NextResponse.json({ message: 'Report cloned successfully', query: (insertValues) }, { status: 200 }); // Debugging
    return NextResponse.json({ message: 'Report cloned successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving report:', error);
    return NextResponse.json({ error: 'Failed to clone report' }, { status: 500 });
  }
}







