import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  const { uuid } = await request.json();

  try {
    const existingAccount = await sql`
      SELECT accountid FROM public.accounts WHERE accountid = ${uuid}
    `;

    if (existingAccount.rows.length > 0) {
      return NextResponse.json({ exists: true });
    } else {
      return NextResponse.json({ exists: false });
    }
  } catch (error) {
    console.error("Database error:", error); // Log the error to the console

    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
