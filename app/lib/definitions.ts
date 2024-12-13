// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.


export type DateConcept = {
  concept: 'issue date' | 'travel date' | 'reporting date';
};


export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  image?: string; // Add the image property, optional
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Report = {
  userid: string  ;
  reportid: string;
  reportname: string;
  description: string;
  updated: Date;
  date_concept: string;
  period: string;
  status: 'draft' | 'result';
  tags:string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.

};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type ReportsTable = {
  userid: string;
  reportid: string;
  reportname: string;
  description: string;
  updated: Date;
  date_concept: string;
  period: string;
  status: 'draft' | 'result';
  tags: string;
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};




export type ReportForm = {
  reportid: string;
  userid: string;
  tags: string;
  status: 'pending' | 'paid';
};


export type UsersTable = {
  id: string, name: string, email: string, 
  accountstatus: string, 
  confirmationstatus: string ;
  // createdtime: Date, 
  // lastupdatedtime: Date
};

export type AccountsTable = {
  accountid: string, accountname: string, billing: string, 
  datasources: string, 
  currencies: string , users:string;

};
export type AccountForm = {
  accountid: string, accountname: string, billing: string, 
  datasources: string, 
  currencies: string ;
};