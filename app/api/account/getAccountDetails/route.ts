import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  const { id } = await request.json();

  try {
    const accountDetails = await sql`
      SELECT accountid, accountname, billing, file as selectedfile, currencies as selectedcurrencies, datasources
      FROM public.accounts
      WHERE accountid = ${id}
    `;

    if (accountDetails.rows.length > 0) {
      
      const account = accountDetails.rows[0];
      const billingStatus = account.billing === 'yes';

      return NextResponse.json({
        accountid: account.accountid,
        accountname: account.accountname,
        billing: billingStatus,
        selectedfile: account.selectedfile,
        selectedcurrencies: account.selectedcurrencies,
        datasources: account.datasources,
      });
    } else {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
    