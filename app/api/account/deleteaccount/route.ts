import { NextResponse } from 'next/server';
import { deleteAccount } from '@/app/lib/actions';

export async function POST(request: Request) {
  const { id } = await request.json(); // Extract ID from request body

  const response = await deleteAccount(id);

  if (response.error) {
    return NextResponse.json({ error: response.error }, { status: 400 });
  } else {
    return NextResponse.json({ message: 'Account deleted successfully' }, { status: 200 });
  }
}