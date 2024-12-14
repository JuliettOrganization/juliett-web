import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  ReportForm,
  ReportsTable,
  LatestInvoiceRaw,
  Revenue,
  UsersTable,
  AccountsTable,
  AccountForm
} from './definitions';
import { formatCurrency } from './utils';


const ITEMS_PER_PAGE = 20;


export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData () {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    // const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    // const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    // const invoiceStatusPromise = sql`SELECT
    //      SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
    //      SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
    //      FROM invoices`;

    // const data = await Promise.all([
    //   invoiceCountPromise,
    //   customerCountPromise,
    //   invoiceStatusPromise,
    // ]);

    // const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    // const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    // const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    // const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    const report_manager = 'lipsun orem1';
    const report_design = 'lipsun orem2';
    const config = 'lipsun orem3';
    const status_loading = 'lipsun orem4';
    return {
       report_manager ,
       report_design,
       config ,
       status_loading ,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}




export async function fetchFilteredReports  (
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const reports = await sql<ReportsTable>`
      SELECT
      
        reportid,
        reportname,
        description,
        date_concept,
        period,
        status,
        tags
      FROM master.report_manager
       where 
       report_manager.reportname ILIKE ${`%${query}%`} OR
        report_manager.description ILIKE ${`%${query}%`} OR
        report_manager.date_concept ILIKE ${`%${query}%`} OR
         report_manager.period ILIKE ${`%${query}%`} OR
          report_manager.status ILIKE ${`%${query}%`} OR
          report_manager.tags ILIKE ${`%${query}%`} 
      ORDER BY reportid DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return reports.rows; 
    // was invoices.rows
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch reports.');
  }
}

export async function fetchReportsPages(query: string): Promise<number> {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM master.report_manager where 
       report_manager.reportname ILIKE ${`%${query}%`} OR
        report_manager.description ILIKE ${`%${query}%`} OR
        report_manager.date_concept ILIKE ${`%${query}%`} OR
         report_manager.period ILIKE ${`%${query}%`} OR
          report_manager.status ILIKE ${`%${query}%`} OR
          report_manager.tags ILIKE ${`%${query}%`} 
    
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of reports.');
  }
}

export async function fetchReportById    (id: string) {
  try {
    const data = await sql<ReportForm>`
      SELECT
        report_manager.userid,
        report_manager.reportid,
        report_manager.tags,
        report_manager.reportname
      FROM master.report_manager
      WHERE report_manager.reportid = ${id};
    `;

    const report = data.rows.map((report) => ({
      ...report,
      // Convert amount from cents to dollars
      amount: report.userid,
    }));

    return report[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch report.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}




export async function fetchFilteredUsers  (
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const users = await sql<UsersTable>`
   SELECT
        u.id,
        u.name,
        u.email,
        u.accountstatus,
        u.confirmationstatus,
        COALESCE(string_agg(a.accountname, '; '), '') AS accountnames
      FROM public.users u
      LEFT JOIN LATERAL (
        SELECT accountname
        FROM public.accounts,
        jsonb_array_elements(accounts.users) AS userj
        WHERE userj->>'id' = u.id::text
      ) a ON true
      WHERE 
        u.name ILIKE ${`%${query}%`} OR
        u.email ILIKE ${`%${query}%`} OR
        u.accountstatus ILIKE ${`%${query}%`} OR
        u.confirmationstatus ILIKE ${`%${query}%`}
      GROUP BY u.id, u.name, u.email, u.accountstatus, u.confirmationstatus
      HAVING COALESCE(string_agg(a.accountname, '; '), '') ILIKE ${`%${query}%`}
      ORDER BY u.email
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return users.rows; 
    // was invoices.rows
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}

export async function fetchUsersPages(query: string) {
  try {
    const count = await sql` 
    SELECT COUNT(*)
      FROM (
        SELECT DISTINCT u.id
        FROM public.users u
        LEFT JOIN LATERAL (
          SELECT accountname
          FROM public.accounts,
          LATERAL jsonb_array_elements(accounts.users) AS userj
          WHERE userj->>'id' = u.id::text
        ) a ON true
        WHERE 
          u.name ILIKE ${`%${query}%`} OR
          u.email ILIKE ${`%${query}%`} OR
          u.accountstatus ILIKE ${`%${query}%`} OR
          u.confirmationstatus ILIKE ${`%${query}%`} OR
          EXISTS (
            SELECT 1
            FROM public.accounts,
            LATERAL jsonb_array_elements(accounts.users) AS userj
            WHERE userj->>'id' = u.id::text
            AND accountname ILIKE ${`%${query}%`}
          )
      ) subquery
    `;
  const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
  return totalPages;
} catch (error) {
  console.error('Database Error:', error);
  throw new Error('Failed to fetch total number of reports.');
}
}

  export async function fetchFilteredAccounts  (
    query: string,
    currentPage: number,
  ) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
    try {
      const accounts = await sql<AccountsTable>`
        SELECT
         accountid,
         accountname,
         billing,
         datasources,
         currencies,
         users
        FROM public.accounts
        LEFT JOIN LATERAL jsonb_array_elements(accounts.users) AS usersj ON true
    WHERE 
      accounts.accountname ILIKE ${`%${query}%`} OR
      accounts.billing ILIKE ${`%${query}%`} OR
      accounts.datasources ILIKE ${`%${query}%`} OR
      accounts.currencies ILIKE ${`%${query}%`} OR
      (usersj IS NOT NULL AND usersj->>'email' ILIKE ${`%${query}%`})

        ORDER BY accountid DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
  
      return accounts.rows; 
      
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch accounts.');
    }
  }
  
  export async function fetchAccountsPages(query: string) {
    try {
      const count = await sql`SELECT COUNT(*)
      FROM public.accounts
      LEFT JOIN LATERAL jsonb_array_elements(accounts.users) AS usersj ON true
    WHERE 
      accounts.accountname ILIKE ${`%${query}%`} OR
      accounts.billing ILIKE ${`%${query}%`} OR
      accounts.datasources ILIKE ${`%${query}%`} OR
      accounts.currencies ILIKE ${`%${query}%`} OR
      (usersj IS NOT NULL AND usersj->>'email' ILIKE ${`%${query}%`})
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of reports.');
  }
}



export async function fetchAccountById    (id: string) {
  try {
    const data = await sql<AccountForm>`
       SELECT
         accounts.accountid,
         accounts.accountname,
         accounts.billing,
         accounts.datasources,
         accounts.currencies,
          accounts.users
        FROM public.accounts
         where accounts.accountid = ${id};
    `;

    const account = data.rows.map((account) => ({
      ...account,
    }));

    return account[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch account.');
  }
}




