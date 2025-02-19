import { NextResponse } from "next/server";
import { SaveAccount } from "@/app/lib/actions";

export async function POST(request: Request) {
  const formData = await request.formData();
  const response = await SaveAccount({}, formData);

  if (response.errors) {
    return NextResponse.json({ errors: response.errors }, { status: 400 });
  } else {
    return NextResponse.json(
      { message: "Account created successfully" },
      { status: 200 },
    );
  }
}
