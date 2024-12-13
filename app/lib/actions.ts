'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { v4 as uuidv4 } from 'uuid';






 
// export async function createInvoice(prevState: State, formData: FormData) {
//   // Validate form using Zod
//   const validatedFields = CreateInvoice.safeParse({
//     customerId: formData.get('customerId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   });
 
//   // If form validation fails, return errors early. Otherwise, continue.
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Create Invoice.',
//     };
//   }
 
//   // Prepare data for insertion into the database
//   const { customerId, amount, status } = validatedFields.data;
//   const amountInCents = amount * 100;
//   const date = new Date().toISOString().split('T')[0];
 
//   // Insert data into the database
//   try {
//     await sql`
//       INSERT INTO invoices (customer_id, amount, status, date)
//       VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
//     `;
//   } catch (error) {
//     // If a database error occurs, return a more specific error.
//     return {error,
//       message: 'Database Error: Failed to Create Invoice.',
//     };
//   }
 
//   // Revalidate the cache for the invoices page and redirect the user.
//   revalidatePath('/home_account/invoices');
//   redirect('/home_account/invoices');
// }

  // const UpdateReport = FormSchema.omit({ id: true, date: true });

  // export async function updateReport(id: string, formData: FormData) {
  //   const { customerId, amount, status } = UpdateReport.parse({
  //     customerId: formData.get('customerId'),
  //     amount: formData.get('amount'),
  //     status: formData.get('status'),
  //   });
   
  //   const amountInCents = amount * 100;
   
  //   try {
  //     await sql`
  //         UPDATE invoices
  //         SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
  //         WHERE id = ${id}
  //       `;
  //   } catch (error) {
  //     return { error, message: 'Database Error: Failed to Update Invoice.' };
  //   }
  //   revalidatePath('/home_account/invoices');
  //   redirect('/home_account/invoices');
  // }

  export async function deleteReport(id: string) {
    try {
      await sql`DELETE FROM master.report_manager WHERE reportid = ${id}`;
      revalidatePath('/home_account/reportmanager');
      return { message: 'Delete Report.' };
    } catch (error) {
      return { error, message: 'Database Error: Failed to Delete Report.' };
     
    }
  }



  export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }



  const FormSchema = z.object({
    accountid: z.string(),
    name: z.string({
      invalid_type_error: 'Please select an account name.',
    }),
    billing: z.boolean({
      invalid_type_error: 'Billing must be a boolean valueE.',
    }),
    currencies: z.string().nullable(),
      // currencies: z.string().nullable(),
      datasources: z.string().nullable(),
  });
  // const CreateAccount = FormSchema.omit({ accountid: true });
  const CreateAccount = FormSchema;
  export type State = {
    errors?: {
      accountid?: string[];
      name?: string[];
      billing?: string[];
      currencies?: string[];
      datasources?: string[];
    };
    message?: string | null;
  };

  export async function SaveAccount(prevState: State, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateAccount.safeParse({
      accountid: formData.get('accountId'),
      name: formData.get('accountName'),
      billing: formData.get('billing') === 'true',
      currencies: formData.get('selectedCurrencies'),
      datasources: formData.get('dataSources'),
    
    });


    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing fields. Failed to create account.',
      };
    }
     
    // Prepare data for insertion into the database
    const { accountid,name, billing,currencies,datasources  } = validatedFields.data;
    const billingStatus = billing ? 'yes' : 'no';

    //const { name, billing, currencies,datasources } = validatedFields.data;
    // const date = new Date().toISOString().split('T')[0];
   
   // VALUES (${accountid},${name}, ${billing}, ${currencies}, ${datasources})
    // Insert data into the database
    try {
      // Check if the account ID already exists
      const existingAccount = await sql`
      SELECT accountid FROM public.accounts WHERE accountid = ${accountid}
    `;

    if (existingAccount.rowCount > 0) {
      // Update the existing account
      await sql`
        UPDATE public.accounts
        SET accountname = ${name}, billing = ${billingStatus}, currencies = ${currencies}, datasources = ${datasources}
        WHERE accountid = ${accountid}
      `;
    } else {
      // Insert a new account
      await sql`
        INSERT INTO public.accounts (accountid, accountname, billing, currencies, datasources)
        VALUES (${accountid}, ${name}, ${billingStatus}, ${currencies}, ${datasources})
      `;
    }
    } catch (error) {
      // If a database error occurs, return a more specific error.
      return {
        errors: { general: ['Database Error: Failed to Create Account.'] },
        message: 'Database Error: Failed to Create Account.',
      };
    }
  
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/home_user/admin/accounts');
   
  
    // Return success message
    return { message: 'Account created successfully' };
  }


  export async function deleteAccount(id: string) {
    try {
      await sql`DELETE FROM public.accounts WHERE accountid = ${id}`;
      revalidatePath('/home_user/admin/accounts');
      return { message: 'Delete Report.' };
    } catch (error) {
      return { error, message: 'Database Error: Failed to Delete Report.' };
     
    }
  }