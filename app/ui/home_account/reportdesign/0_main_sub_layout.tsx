// create-form-layout-page.tsx
'use client';
import React, { useState } from 'react';
import LayoutRightPurplePanel from './2_layout_right_purple_panel';
import LayoutMainInfoForm from './1_layout_main_info_form';
import FilterForm from '@/app/ui/home_account/reportdesign/3_tab2_filter-form';
import { ArrowUturnLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import FieldButtons from '@/app/ui/home_account/reportdesign/3_tab1_FieldButtons';
import ToggleSwitchCustomSql from './3_tab3_custom-sql-toggle';
import TextBoxSQL from './3_tab3_custom-sql';
import MainOptionsForm from './3_tab0_main_options';

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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<number>(0);

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
  );

  return (
    <main className="z-20">
      <LayoutRightPurplePanel fields={fields} removeField={removeField} />
      <LayoutMainInfoForm />

      <div className="flex flex-col mt-10 mr-48 h-full border-none marker:overflow-y-auto">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab(0)}
            className={`px-4 py-2 ${activeTab === 0 ? 'rounded-t-lg border-b-4 border-purple-500 bg-white text-purple-500' : 'rounded-t-lg bg-gray-200'}`}
          >
            Main Options
          </button>
          <button
            onClick={() => setActiveTab(1)}
            className={`px-4 py-2 ${activeTab === 1 ? 'rounded-t-lg border-b-4 border-purple-500 bg-white text-purple-500' : 'rounded-t-lg bg-gray-200'}`}
          >
            Field Selection
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={`px-4 py-2 ${activeTab === 2 ? 'rounded-t-lg border-b-4 border-purple-500 bg-white text-purple-500' : 'rounded-t-lg bg-gray-200'}`}
          >
            Filters
          </button>
          <button
            onClick={() => setActiveTab(3)}
            className={`px-4 py-2 ${activeTab === 3 ? 'rounded-t-lg border-b-4 border-purple-500 bg-white text-purple-500' : 'rounded-t-lg bg-gray-200'}`}
          >
             Custom Filters
          </button>
        </div>

        <div className="bg-white rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-lg overflow-y-auto">
        {activeTab === 0 && (
            <div className="flex flex-col w-full p-6 bg-white rounded space-y-4">
             
                <MainOptionsForm />
           
            </div>
          )}
         
          {activeTab === 1 && (
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
              <FieldButtons addTag={addTag} fields={filteredFields} selectedFields={fields}/>
            </div>
          )}
          {activeTab === 2 && (
            <div className="w-full bg-white rounded-tr-lg rounded-br-lg rounded-bl-lg">
              <FilterForm />
            </div>
          )}
          {activeTab === 3 && (
            <div className="flex flex-col w-full p-6 bg-white rounded space-y-4">
              <div className="flex flex-col w-full p-6 items-center bg-white rounded space-y-4">
                <ToggleSwitchCustomSql />
              </div>
              <TextBoxSQL />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CreateFormLayout;
