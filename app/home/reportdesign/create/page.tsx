import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import { ArrowUturnLeftIcon, RectangleGroupIcon  } from '@heroicons/react/24/outline';
import Link from 'next/link'
import { ButtonSave} from '@/app/ui/button';

export default async function Page() {
  const customers = await fetchCustomers();
  return (
    
      <main>
         {/* THIS IS THE RIGHT PANEL PURPLE */}
        <div className="fixed top-32 right-0 w-48 h-full items-center p-4 bg-purple-700">
        <div className="mt-1 flex flex-row text-white font-bold text-2xl gap-4 items-center">
        <RectangleGroupIcon className="w-7 md:w-9" /> 
        <p>Group By</p>
          </div>
        <div className="mt-6 flex flex-col justify-end gap-4 border-b-2 border-white p-4">
        
          </div>
        <div className="mt-6 flex flex-col justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-full bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <ButtonSave className="rounded-full" type="submit">Save Report</ButtonSave>
      </div>
      </div>

         {/* THIS IS THE TOP WHITE BAR */}
      <div className="fixed top-20 left-0 w-full h-12 flex items-center p-4 bg-white shadow-bottom-border space-x-4">
        <ArrowUturnLeftIcon className="w-5 md:w-6 font-bold text-purple-500" />
        <p className="font-bold text-purple-500"> <Link href={'/home/reportmanager'}
        >Report Manager</Link>
        </p>
      </div>
    
    {/* THIS IS THE FORM */}
      <div className="flex flex-col mt-10 mr-48">
          {/* <Form customers={customers} /> */}
          <Form  />
          </div> 
      </main>

  );
  
}




