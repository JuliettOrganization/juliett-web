import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const selectedGrouping = url.searchParams.get('selectedGrouping');

    // This is to be collected from DB: VALUES of the user grouping selected
    const selectedGroupingValues = selectedGrouping ? [selectedGrouping, 
      'Air France - AF', 'Lufthansa - LH', 
      'American Airlines - AA', 'Iberia - IB', 
      'Emirates - EK', 'Air Canada - AC'] : [];

    return NextResponse.json(selectedGroupingValues);
  } catch (error) {
    console.error('Database error:', error); // Log the error to the console
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

// import { NextResponse } from 'next/server';
  
//  export async function GET(SelectedGrouping: string) {
//   try {
    
//         //this is to be collected from DB :  VALUES of the user grouping selected 
//     const SelectedGroupingValues = [SelectedGrouping, 
//         'Air France - AF', 'Lufthansa - LH', 
//         'American Airlines - AA','Iberia - IB', 
//         'Emirates - EK', 'Air Canada - AC'];


// return NextResponse.json(SelectedGroupingValues);
//   } catch (error) {
//     console.error('Database error:', error); // Log the error to the console
//     return NextResponse.json({ error: 'Database error' }, { status: 500 });
//   }
// }