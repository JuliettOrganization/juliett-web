import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '@/auth';

export async function POST(request: Request) {
  try {
    const { reportData } = await request.json();
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const useremail = session.user.email;
    
      // Insert new report
      const newReportId = uuidv4();
    
    // Ensure the reportid does not already exist
    const checkReportIdQuery = 'SELECT 1 FROM reports WHERE reportid = $1';
    const checkReportIdResult = await sql.query(checkReportIdQuery, [newReportId]);
    if (checkReportIdResult.rows.length > 0) {
      throw new Error('Report ID already exists');
    }

    const insertQuery = `
      INSERT INTO reports (
       reportid,useremail,reportname,status, tags, updated, description,od_concept, 
        od_filtering, amounts, benchmark_date_from, benchmark_date_to, 
        benchmark_period, currency, date_concept, date_from, date_to, 
        fields, is_custom_sql_active, selected_grouping_agency, 
        selected_grouping_geo_from, selected_grouping_geo_to, 
        selected_grouping_issuing, selected_grouping_marketing, 
        selected_grouping_operating, selected_grouping_values_agency, 
        selected_grouping_values_geo_from, selected_grouping_values_geo_to, 
        selected_grouping_values_issuing, selected_grouping_values_marketing, 
        selected_grouping_values_operating, sql_code, transaction_type, accountid
      ) VALUES (
       $1,$2,$3,$4,$5,NOW(),$6, $7, $8, $9, $10, $11, $12, $13, $14, $15, 
        $16, $17, $18, $19, $20,$21, $22, $23, $24, $25, $26, $27, $28, $29, $30,$31,$32,$33
      )
   
    `;

    const insertValues = [
      newReportId,
      useremail,
      reportData.reportName,
      'running',
      reportData.tags.map((tag: { text: string }) => tag.text).join(';'),
      reportData.description,
      reportData.ODconcept,
      reportData.ODfiltering,
      reportData.amounts,
      reportData.benchmarkDateFrom,
      reportData.benchmarkDateTo,
      reportData.benchmarkPeriod,
      reportData.currency,
      reportData.dateConcept,
      reportData.dateFrom,
      reportData.dateTo,
      reportData.fields,
      reportData.isCustomSqlActive,
      reportData.selectedGroupingAgency,
      reportData.selectedGroupingGeoFrom,
      reportData.selectedGroupingGeoTo,
      reportData.selectedGroupingIssuing,
      reportData.selectedGroupingMarketing,
      reportData.selectedGroupingOperating,
      reportData.selectedGroupingValuesAgency,
      reportData.selectedGroupingValuesGeoFrom,
      reportData.selectedGroupingValuesGeoTo,
      reportData.selectedGroupingValuesIssuing,
      reportData.selectedGroupingValuesMarketing,
      reportData.selectedGroupingValuesOperating,
      reportData.sqlCode,
      reportData.transactionType,
      reportData.accountid
    ];

    await sql.query(insertQuery, insertValues);

   // return NextResponse.json({ message: 'Report saved successfully RUNNNNN' }, { status: 200 });
  //     // // Perform the rest of the actions in the background
  //  async function generateExcelAndUpdateStatus() {
  //   try {
  //     console.log('Starting background task to generate Excel and update status');

  //     // Trigger the Excel generation API
  //     const excelResponse = await fetch('/api/home_account/reportdesign/generateExcel', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ reportData, reportId: newReportId }),
  //     });

  //     if (!excelResponse.ok) {
  //       console.error('Failed to generate Excel file');
  //       return;
  //     }

  //     console.log('Excel file generated successfully');

  //     // Update the report status to 'result' in the database
  //     await sql`
  //       UPDATE reports
  //       SET status = 'result'
  //       WHERE reportid = ${newReportId}
  //     `;

  //     console.log('Report status updated to result');
  //   } catch (error) {
  //     console.error('Error in background task:', error);
  //   }
  // }

  //  generateExcelAndUpdateStatus();
  return NextResponse.json({ message: 'Go to Report Manager to download your results', reportId: newReportId }, { status: 200 });

  } catch (error) {
    console.error('Error running report:', error);
    return NextResponse.json({ error: 'Failed to run report' }, { status: 500 });
  }
}
// import { NextResponse } from 'next/server';
// import { sql } from '@vercel/postgres';
// import { v4 as uuidv4 } from 'uuid';
// import { auth } from '@/auth';

// export async function POST(request: Request) {
//   try {
//     const { reportData } = await request.json();
//     const session = await auth();

    

//     if (!session || !session.user) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }
//     const useremail = session.user.email;
//     const newReportId = uuidv4();
//     const checkReportIdQuery = 'SELECT 1 FROM reports WHERE reportid = $1';
//     const checkReportIdResult = await sql.query(checkReportIdQuery, [newReportId]);
//     if (checkReportIdResult.rows.length > 0) {
//       throw new Error('Report ID already exists');
//     }

//     // Insert the report into the database with status 'running'
//     const insertQuery = `
//       INSERT INTO reports (
//         reportid, useremail, reportname, status, tags, description, odconcept, odfiltering, amounts, 
//         benchmark_date_from, benchmark_date_to, benchmark_period, currency, date_concept, date_from, 
//         date_to, fields, is_custom_sql_active, selected_grouping_agency, selected_grouping_geo_from, 
//         selected_grouping_geo_to, selected_grouping_issuing, selected_grouping_marketing, 
//         selected_grouping_operating, selected_grouping_values_agency, selected_grouping_values_geo_from, 
//         selected_grouping_values_geo_to, selected_grouping_values_issuing, selected_grouping_values_marketing, 
//         selected_grouping_values_operating, sql_code, transaction_type, accountid
//       ) VALUES (
//         $1, $2, $3, $4, $5, NOW(), $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, 
//         $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33
//       )
//     `;

//     const insertValues = [
//       newReportId,
//       useremail,
//       reportData.reportName,
//       'running',
//       reportData.tags.map((tag: { text: string }) => tag.text).join(';'),
//       reportData.description,
//       reportData.ODconcept,
//       reportData.ODfiltering,
//       reportData.amounts,
//       reportData.benchmarkDateFrom,
//       reportData.benchmarkDateTo,
//       reportData.benchmarkPeriod,
//       reportData.currency,
//       reportData.dateConcept,
//       reportData.dateFrom,
//       reportData.dateTo,
//       reportData.fields,
//       reportData.isCustomSqlActive,
//       reportData.selectedGroupingAgency,
//       reportData.selectedGroupingGeoFrom,
//       reportData.selectedGroupingGeoTo,
//       reportData.selectedGroupingIssuing,
//       reportData.selectedGroupingMarketing,
//       reportData.selectedGroupingOperating,
//       reportData.selectedGroupingValuesAgency,
//       reportData.selectedGroupingValuesGeoFrom,
//       reportData.selectedGroupingValuesGeoTo,
//       reportData.selectedGroupingValuesIssuing,
//       reportData.selectedGroupingValuesMarketing,
//       reportData.selectedGroupingValuesOperating,
//       reportData.sqlCode,
//       reportData.transactionType,
//       reportData.accountid
//     ];

//     await sql.query(insertQuery, insertValues);

//     // Return response immediately after updating the status to 'running'
//     return NextResponse.json({ message: 'Go to Report Manager to download your results' }, { status: 200 });

//     // // Perform the rest of the actions in the background
//     // (async () => {
//     //   // Trigger the Excel generation API
//     //   const excelResponse = await fetch('/api/home_account/reportdesign/generateExcel', {
//     //     method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify({ reportData, reportId: newReportId }),
//     //   });

//     //   if (!excelResponse.ok) {
//     //     console.error('Failed to generate Excel file');
//     //     return;
//     //   }

//     //   // Update the report status to 'result' in the database
//     //   await sql`
//     //     UPDATE reports
//     //     SET status = 'result'
//     //     WHERE reportid = ${newReportId}
//     //   `;
//     // })();

//   } catch (error) {
//     console.error('Error running report:', error);
//     return NextResponse.json({ error: 'Error running report' }, { status: 500 });
//   }
// }