import { NextResponse } from "next/server";

export async function GET() {
  try {
    const subGroups = {
      "Standard Regions": [
        "Africa",
        "Asia",
        "Europe",
        "North America",
        "South America",
        "Oceania",
        "Middle East",
      ],
      "Contracts HQ": [],
      "Contract AF Regions": [],
    };

    return NextResponse.json(subGroups);
  } catch (error) {
    console.error("Database error:", error); // Log the error to the console
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
