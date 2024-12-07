'use client';
import React, { useState } from 'react';
import Form from '@/app/ui/home_account/reportdesign/create-form';
import FilterForm from '@/app/ui/home_account/reportdesign/filter-form';
import { ArrowUturnLeftIcon, RectangleGroupIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ButtonSave } from '@/app/ui/button';
import FieldButtons from '@/app/ui/home_account/reportdesign/FieldButtons';
import SelectedFields from '@/app/ui/home_account/reportdesign/SelectedFields';
import ToggleSwitchCustomSql from './filter-form-custom-sql-toggle';
import  TextBoxSQL from './filter-form-custom-sql';


const CreateFormLayout: React.FC = () => {
  const availableFields = [
    'agency code (booking)', 'agency code (issuing)', 'airline code (marketing)',
    'commission (total)', 'coupon number', 'currency code (local)', 'date (issuing)',
    'date (travel)', 'deal code (GNR5)', 'destination (coupon level)',
    'destination airport code (ticket level)', 'destination city code (coupon level)',
    'destination city code (ticket level)', 'destination country code (ticket level)',
    'destination country code (coupon level)', 'domestic international flag', 'EMD remarks',
    'endorsement remarks', 'fare basis', 'flight number', 'gross amount (local currency)',
    'origin (coupon level)', 'origin airport code (ticket level)', 'origin city code (coupon level)',
    'origin city code (ticket level)', 'origin country code (ticket level)', 'origin country code (coupon level)',
    'passenger date of birth', 'passenger FFP', 'passenger name', 'passenger PNR', 'passenger Type',
    'RBD', 'RDII', 'reason for issuance code', 'Reporting System', 'routing', 'Sector Number',
    'stopover', 'taxes', 'ticket number (original reference)', 'ticket number (primary)',
    'ticket number (refunded)', 'ticket number (TDNR)', 'tour code', 'transaction code',
    'yq amount (local currency)', 'yr amount (local currency)',
  ];
  const [fields, setFields] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(''); // Step 1: Add state for search query
  const [activeTab, setActiveTab] = useState<number>(0); // Step 4: Add state for active tab

  const addTag = (field: string) => {
    if (!fields.includes(field)) {
      setFields([...fields, field]);
    }
  };

  const removeField = (field: string) => {
    setFields(fields.filter((t) => t !== field));
  };

  const filteredFields = availableFields.filter((field) =>
    field.toLowerCase().includes(searchQuery.toLowerCase())
  ); // Step 2: Filter fields based on search query

  return (
    <main>
      {/* THIS IS THE RIGHT PANEL PURPLE */}
      <div className="fixed top-32 right-0 w-48 h-full bg-purple-700">
        <div className="mt-1 flex flex-row text-white font-bold text-2xl p-4 gap-4 items-center">
          <RectangleGroupIcon className="w-7 md:w-9" />
          <p>Group By</p>
        </div>
        <div className="flex flex-col space-y-4 h-3/5 overflow-y-auto">
          <SelectedFields fields={fields} removeField={removeField} />
        </div>
        <div className="absolute bottom-80 bg-red-700 flex flex-col justify-end gap-4 border-b-2 border-white pl-12 pr-24 mr-6 ml-6"></div>
        <div className="absolute bottom-32 flex flex-col gap-4 p-3 mr-6 ml-6">
          <Link
            href="/home_account/reportmanager"
            className="flex h-10 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <ButtonSave className="flex h-10 items-center justify-center rounded-full" type="submit">
            Save Report
          </ButtonSave>
          <ButtonSave className="flex h-10 items-center justify-center rounded-full" type="submit">
            Run Report
          </ButtonSave>
        </div>
      </div>

      {/* THIS IS THE TOP WHITE BAR */}
      <div className="fixed top-20 left-0 w-full z-50 h-12 flex items-center p-4 bg-white shadow-bottom-border space-x-4">
        <ArrowUturnLeftIcon className="w-5 md:w-6 font-bold text-purple-500" />
        <p className="font-bold text-purple-500">
          <Link href={'/home_account/reportmanager'}>Report Manager</Link>
        </p>
      </div>

      {/* THIS IS THE TOP MAIN FORM */}
      <div className="flex flex-col mt-10 mr-48 overflow-y-auto shadow-lg">
        <Form />
      </div>

      {/* TABS */}
      <div className="flex flex-col mt-10 mr-48 h-full overflow-y-auto">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab(0)}
            className={`px-4 py-2 ${activeTab === 0 ? 'rounded-t-lg border-b-4 border-purple-500 bg-white text-purple-500' : 'rounded-t-lg bg-gray-200'}`}
          >
            Field Selection
          </button>
          <button
            onClick={() => setActiveTab(1)}
            className={`px-4 py-2 ${activeTab === 1 ? 'rounded-t-lg border-b-4 border-purple-500 bg-white text-purple-500' : 'rounded-t-lg bg-gray-200'}`}
          >
            Filters
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={`px-4 py-2 ${activeTab === 2 ? 'rounded-t-lg border-b-4 border-purple-500 bg-white text-purple-500' : 'rounded-t-lg bg-gray-200'}`}
          >
            Custom Filters
          </button>
        </div>

        {/* TAB CONTENT */}
            {/* TAB 1 */}
                {/* THIS IS THE SEARCH BAR */}
                <div className="bg-white rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-lg">
                  {activeTab === 0 && (
                    <div>
                      <div className="relative p-4 flex flex-1 flex-shrink-0">
                        <input
                          type="text"
                          placeholder="Click on fields below to include them on the report Group By. Type here to search fields..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <MagnifyingGlassIcon className="absolute left-8 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                      </div>

                      {/* THIS IS THE FIELD SELECTION */}
                      <FieldButtons addTag={addTag} fields={filteredFields} selectedFields={fields}/>
                    </div>
                  )}

             {/* TAB 2: FILTERS */}   
                {activeTab === 1 && (
                  <div >
                <div className="bg-white rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-lg">
                <FilterForm />
      </div>
     
                  </div>
                )}

            {/* TAB 3 */} 
          {activeTab === 2 && (
            <div className="flex flex-col w-full p-6 bg-white rounded space-y-4">
              {/* Content for Tab 3 */}
              <div className="flex flex-col w-full p-6 items-center bg-white rounded space-y-4"> 
              <ToggleSwitchCustomSql />
              </div>
              <TextBoxSQL/>
            </div>
            
          )}
        </div>
      </div>
    </main>
  );
};

export default CreateFormLayout;
