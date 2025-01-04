import { NextResponse } from 'next/server';
  
 export async function GET() {
  try {
    
       
    const defaultAirlineGroup = [
        'Airline Name',
        'Airline Country'
      ];

    //this is to be replaced by the user grouping list from DB
      const userAirlineGroup = [
      'Airline Alliance 1',
      'Airline User Group 2'
    ];
    

const combinedAirlineGroup = defaultAirlineGroup.concat(userAirlineGroup);

return NextResponse.json(combinedAirlineGroup);
  } catch (error) {
    console.error('Database error:', error); // Log the error to the console
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}