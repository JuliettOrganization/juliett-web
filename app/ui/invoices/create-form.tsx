'use client';


import { useActionState } from 'react';
import TagInput from '@/app/components/TagInput';
import { DateConcept } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  XMarkIcon,
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice, State } from '@/app/lib/actions';

export default function Form() {
  const handleSubmit = (e) => { e.preventDefault();};
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);
  return (
    <form action={formAction}>
      
      <div className="rounded-md bg-purple-200">
      <div className="flex flex-row rounded-md bg-purple-200 pt-4 pr-4 pl-6 pb-1 space-x-6">

         {/* Report Name */}
         <div className="mb-4 w-[250px]">
          <label htmlFor="report_name" className="mb-2 block text-sm font-medium">
            Report Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="report_name"
                name="report_name"
                type="string"
                // step="0.01"
                placeholder="Type here"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                required

              />
            
            </div>
          </div>
        </div>
        
        {/* Description */}
        <div className="mb-4 w-[250px]">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="Description"
                name="Description"
                type="string"
                // step="0.01"
                placeholder="Type here"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                

              />
            
            </div>
          </div>
        </div>

        {/* Tags */}
       
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Tags
          </label>
          
          <div className="flex flex-grow rounded-md border border-gray-200 bg-white px-[14px] pl-0 py-0 flex items-center gap-4">
             <div onSubmit={handleSubmit} className="flex items-center">
               <TagInput /> 
               </div> 
               </div>
               </div>
     
      </div>
     
      <div className="flex flex-row pt-0 pr-4 pl-6 pb-4 rounded-md bg-purple-200 space-x-6">

         {/* Date Concept */}
         <div className="mb-4">
          <label htmlFor="DateConcept" className="mb-2 block text-sm font-medium">
          Date Concept
          </label>
          <div className="relative">
            <select
              id="DateConcept"
              name="DateConcept"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              defaultValue="Issue Date"
            >
           <option value="Option1">Issue Date</option>
           <option value="Option2">Travel Date</option>
           <option value="Option3">Reporting Date</option>
            </select>
          </div>
        </div>
        
          {/* Date from */}
          <div className="mb-4">
          <label htmlFor="DateFrom" className="mb-2 block text-sm font-medium">
          Date From
          </label>
          <div className="relative">
            <input
              id="DateFrom"
              name="DateFrom"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              type="date"
              defaultValue=""
              />
          </div>
        </div>
        

  {/* Date to */}
  <div className="mb-4">
          <label htmlFor="DateTo" className="mb-2 block text-sm font-medium">
          Date From
          </label>
          <div className="relative">
            <input
              id="DateTo"
              name="DateTo"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              type="date"
              defaultValue="Click Here"
              />
          </div>
        </div>

 {/* Date Concept */}
 <div className="mb-4">
          <label htmlFor="BenchmarkPeriod" className="mb-2 block text-sm font-medium">
          Benchmark Period
          </label>
          <div className="relative">
            <select
              id="BenchmarkPeriod"
              name="BenchmarkPeriod"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              defaultValue="Yes"
            >
           <option value="Option1">Yes</option>
           <option value="Option2">No</option>
            </select>
          </div>
        </div>
{/* Date from benchmark */}
<div className="mb-4">
          <label htmlFor="DateFromBenchmark" className="mb-2 block text-sm font-medium">
          Date From
          </label>
          <div className="relative">
            <input
              id="DateFromBenchmark"
              name="DateFromBenchmark"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              type="date"
              defaultValue="Click Here"
              />
          </div>
        </div>

        {/* Date to benchmark */}
<div className="mb-4">
          <label htmlFor="DateToBenchmark" className="mb-2 block text-sm font-medium">
          Date From
          </label>
          <div className="relative">
            <input
              id="DateToBenchmark"
              name="DateToBenchmark"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              type="date"
              defaultValue="Click Here"
              />
          </div>
        </div>

     
      
       
      </div>
      
      </div>
    </form>
  );
}

