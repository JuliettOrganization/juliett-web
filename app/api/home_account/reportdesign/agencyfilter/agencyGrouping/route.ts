import { NextResponse } from "next/server";

export async function GET() {
  try {
    //this is to be replaced by the user grouping list from DB
    const userAgencyGroup = ["Grouping 1", "Grouping 2", "Grouping 3"];

    return NextResponse.json(userAgencyGroup);
  } catch (error) {
    console.error("Database error:", error); // Log the error to the console
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
