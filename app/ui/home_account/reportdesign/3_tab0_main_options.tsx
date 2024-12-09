'use client';

import CheckBoxTransactionType from "@/app/ui/home_account/reportdesign/3_tab0_transaction_type_check-box";
import CheckBoxAmount from "@/app/ui/home_account/reportdesign/3_tab0_amounts_check-box";


export default function MainOptionsForm() {

 
  return (
    <form className="space-y-4 h-[50vh]">
      
      <div className="rounded-md border-none bg-white ">
      <div className="flex flex-col rounded-md pt-4 pr-4 pb-6 justify-start space-y-6">

         {/* Currency */}
         <div className="mb-4 flex-nowrap">
          <label htmlFor="Currency" className="mb-2 block text-sm font-medium">
          Currency
          </label>
          <div className="relative">
            <select
              id="Currency"
              name="Currency"
              className="peer block cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              defaultValue="EUR"
            >
           {/* this list of currencies should come from the exchange rate master table which is the same for all users/accounts
           */}
           <option value="Option1">EUR</option>
           <option value="Option2">USD</option>
           <option value="Option3">Local</option>
            </select>
          </div>
        </div>
        
        {/* TransactionType */}
<div>
            <CheckBoxTransactionType />
            </div>

      
        
         {/* Date Concept */}
  
            <CheckBoxAmount />
  

        
        

     
      
       
      </div>
      
      </div>
    </form>
  );
}

