'use client';

import CheckBoxTransactionType from "@/app/ui/home_account/reportdesign/3_tab0_transaction_type_check-box";
import CheckBoxAmount from "@/app/ui/home_account/reportdesign/3_tab0_amounts_check-box";


export default function MainOptionsForm() {

 
  return (
    <div className="space-y-2 p-4 rounded-lg">
      
      <div className="rounded-md border-none bg-white ">
      <div className="flex flex-row rounded-md pr-4 justify-start text-xl font-bold">Main Options</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 pr-4 justify-start">
      <div>
         {/* Currency */}
         <div className="mb-4 flex-nowrap">
          <label htmlFor="Currency" className="mb-2 block text-sm font-medium">
          Currency
          </label>
          <div className="relative ">
          <select
              id="Currency"
              name="Currency"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 bg-white"
              defaultValue="EUR"
            >
              {/* this list of currencies should come from the exchange rate master table which is the same for all users/accounts */}
              <option value="EUR" className="bg-white text-black">EUR</option>
              <option value="USD" className="bg-white text-black">USD</option>
              <option value="Local" className="bg-white text-black">Local</option>
            </select>
           {/* this list of currencies should come from the exchange rate master table which is the same for all users/accounts
           */}

          </div>
        </div>
        </div>
        {/* TransactionType */}
<div>
            <CheckBoxTransactionType />
            </div>

      
        
         {/* Date Concept */}
  
         <div><CheckBoxAmount /></div>
  

        
        

     
      
       
      </div>
      
      </div>
    </div>
  );
}

