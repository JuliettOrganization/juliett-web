import { NextResponse } from 'next/server';

export async function GET() {
  // Hardcoded KPI data for demonstration purposes
  const kpiData = [
    { title: 'Total Gross', value: '1,000,000', yoy: '+10%' },
    { title: 'Total Coupon Count', value: '500', yoy: '+5%' },
    { title: 'Total Ticket Count', value: '450', yoy: '+7%' },
    { title: 'Average Fare', value: '2,222', yoy: '+3%' },
  ];

  return NextResponse.json(kpiData);
}