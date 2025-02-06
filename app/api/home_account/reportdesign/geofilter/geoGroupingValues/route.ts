import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const selectedGrouping = url.searchParams.get("selectedGrouping");

    // Check if selectedGrouping is None or blank
    if (!selectedGrouping || selectedGrouping === "None") {
      return NextResponse.json([]);
    }

    // This is to be collected from DB: VALUES of the user grouping selected
    const selectedGroupingValues = [
      selectedGrouping,
      "CDG",
      "MAD",
      "JFK",
      "SYD",
      "OSL",
      "YUL",
    ];

    return NextResponse.json(selectedGroupingValues);
  } catch (error) {
    console.error("Database error:", error); // Log the error to the console
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
