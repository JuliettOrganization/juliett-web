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

    const userid = session.user.id;
    const useremail = session.user.email;
    //'410544b2-4001-4271-9855-fec4b6a6442a'
    //session.user.id;
    const reportid = uuidv4();
    
  //uuidv4();

    // Ensure the reportid does not already exist
    const checkReportIdQuery = 'SELECT 1 FROM reports WHERE reportid = $1';
    const checkReportIdResult = await sql.query(checkReportIdQuery, [reportid]);
    if (checkReportIdResult.rows.length > 0) {
      throw new Error('Report ID already exists');
    }

    const insertQuery = `
      INSERT INTO reports (
       reportid,userid,reportname,status
      ) VALUES (
       $1,$2,$3,$4
      )
   
    `;

    const values = [
      reportid,
      userid,
      reportData.reportName,
    useremail
    ];

    await sql.query(insertQuery, values);

    return NextResponse.json({ message: 'Report saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving report:', error);
    return NextResponse.json({ error: 'Failed to save report' }, { status: 500 });
  }
}