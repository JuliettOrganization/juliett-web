'use client';
import React, { useEffect, useState } from 'react';
import CheckBoxTransactionType from "@/app/ui/home_account/reportdesign/3_tab0_transaction_type_check-box";
import CheckBoxAmount from "@/app/ui/home_account/reportdesign/3_tab0_amounts_check-box";

interface MainOptionsFormProps {
  currency: string;
  setCurrency: (currency: string) => void;
  selectedTransactionTypes: string[];
  setSelectedTransactionTypes: (transactionTypes: string[]) => void;
  selectedAmounts: string[];
  setSelectedAmounts: (amounts: string[]) => void;
}

export default function MainOptionsForm({
  currency,
  setCurrency,
  selectedTransactionTypes,
  setSelectedTransactionTypes,
  selectedAmounts,
  setSelectedAmounts,
}: MainOptionsFormProps) {

  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);

  useEffect(() => {
    // Fetch currency options from API
    const fetchCurrencyOptions = async () => {
      try {
        const response = await fetch('/api/home_account/reportdesign/currency');
        const data = await response.json();
        if (Array.isArray(data)) {
          setCurrencyOptions(data);
          if (data.length > 0 && !currency) {
            setCurrency(data[0]); // Set initial currency to the first option
          }
        } else {
          console.error('Unexpected response format:', data);
        }
      } catch (error) {
        console.error('Error fetching currency options:', error);
      }
    };

    fetchCurrencyOptions();
  }, [currency, setCurrency]);

  useEffect(() => {
    // Any necessary side effects can be handled here
  }, [currency, selectedTransactionTypes, selectedAmounts]);


  return (
    <div className="space-y-2 p-4 rounded-lg">
      
      <div className="rounded-md border-none bg-white ">
      <div className="flex flex-row rounded-md pr-4 justify-start text-xl font-bold">Main Options</div>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 pt-4 pr-4 justify-start">
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
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  {currencyOptions.map((option) => (
                    <option key={option} value={option} className="bg-white text-black">
                      {option}
                    </option>
                  ))}
                </select>
           {/* this list of currencies should come from the exchange rate master table which is the same for all users/accounts
           */}

          </div>
        </div>
        </div>
        {/* TransactionType */}
<div className="md:col-span-3 lg:col-span-3">
  <CheckBoxTransactionType
    selectedTransactionTypes={selectedTransactionTypes}
    setSelectedTransactionTypes={setSelectedTransactionTypes}
  />
</div>

      
        
         {/* Date Concept */}
  
        <div className="md:col-span-3 lg:col-span-3 overflow-x-auto">
          <CheckBoxAmount  
            selectedAmounts={selectedAmounts}
            setSelectedAmounts={setSelectedAmounts}
          />
        </div>
      </div>
      
      </div>
    </div>
  );
}

