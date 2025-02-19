import { NextResponse } from "next/server";

export async function GET() {
  try {
    const subGroups = {
      "Group 1": ["SubGroup Q", "SubGroup W", "SubGroup E"],
      "Group 2": [],
      "Group 3": [],
    };

    return NextResponse.json(subGroups);
  } catch (error) {
    console.error("Database error:", error); // Log the error to the console
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
