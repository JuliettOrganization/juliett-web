import { NextResponse } from 'next/server';
  

 export async function GET() {
  try {
    const subGroups = {
      'Airline Alliances': ['SkyTeam', 'Oneworld', 'Star Alliance', 'None'],
      'Contracts HQ': [],
      'Contracts Local': [],
    };

    return NextResponse.json(subGroups);
  } catch (error) {
    console.error('Database error:', error); // Log the error to the console
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}