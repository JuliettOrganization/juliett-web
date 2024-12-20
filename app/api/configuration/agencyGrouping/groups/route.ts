import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const groups = ['Group 1', 'Group 2', 'Group 3'];
  
      return NextResponse.json(groups);
    } catch (error) {
      console.error('Database error:', error); // Log the error to the console
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
  }