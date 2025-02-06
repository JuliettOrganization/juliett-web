import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const { scheduleData } = await request.json();
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const useremail = session.user.email;

    const updateQuery = `
          UPDATE reports
          SET
                isscheduleractive=$1,
                schedulefrequency=$2,
                scheduleperiodconcept=$3,
                schedulefirstdayofyear=$4,
              scheduleemail=$5
        WHERE reportid = $6
      `;
    const updateValues = [
      scheduleData.isSchedulerActive,
      scheduleData.scheduleFrequency,
      scheduleData.schedulePeriodConcept,
      scheduleData.scheduleFirstDayOfYear,
      scheduleData.scheduleEmail,
      scheduleData.reportid,
    ];
    await sql.query(updateQuery, updateValues);

    return NextResponse.json(
      { message: "Report scheduled successfully", updateQuery, updateValues },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error scheduling report:", error);
    return NextResponse.json(
      { error: "Failed to scheduled report" },
      { status: 500 },
    );
  }
}
