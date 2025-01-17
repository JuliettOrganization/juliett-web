import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { reportid } = await request.json();

    if (!reportid) {
      return NextResponse.json({ error: 'Report ID is required' }, { status: 400 });
    }

    const query = `
      SELECT    isscheduleractive,
                schedulefrequency,
                scheduleperiodconcept,
                schedulefirstdayofyear,
             	scheduleemail
      
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

// import { NextResponse } from 'next/server';
// import { sql } from '@vercel/postgres';

// export async function POST(request: Request) {
//   try {
//     const { reportid } = await request.json();

//     if (!reportid) {
//       return NextResponse.json({ error: 'Report ID is required' }, { status: 400 });
//     }

//     const query = `
//       SELECT    isscheduleractive,
//                 schedulefrequency,
//                 scheduleperiodconcept,
//                 schedulefirstdayofyear,
//              	scheduleemail
//       FROM reports
//       WHERE reportid = '$1'
//     `;
//     const result = await sql.query(query, [reportid]);

//     if (result.rows.length === 0) {
//       return NextResponse.json({ error: 'Report not found' }, { status: 404 });
//     }

//     const reportData = result.rows[0];
//     return NextResponse.json(reportData, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching report details:', error);
//     return NextResponse.json({ error: 'Failed to fetch report details' }, { status: 500 });
//   }
// }