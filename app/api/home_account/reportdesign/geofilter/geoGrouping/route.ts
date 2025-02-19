import { NextResponse } from "next/server";

export async function GET() {
  try {
    const defaultGeoGroup = [
      "Airport Name",
      "Airport City",
      "Airport Country",
      "Airport Region",
    ];
    //this is to be replaced by the user grouping list from DB
    const userGeoGroup = ["User Geo Grouping 1", "User Geo Grouping 2"];

    const combinedGeoGroup = defaultGeoGroup.concat(userGeoGroup);

    return NextResponse.json(combinedGeoGroup);
  } catch (error) {
    console.error("Database error:", error); // Log the error to the console
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
