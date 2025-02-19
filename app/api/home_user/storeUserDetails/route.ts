import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { auth } from "@/auth"; // Assuming you have an auth module to get the current user session

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;
    const { name, country, language } = await request.json();

    const result = await sql`
      UPDATE users
      SET name = ${name}, country = ${country}, language = ${language}
      WHERE email = ${userEmail}
    `;

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User details updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
