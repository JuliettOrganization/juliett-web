'use client';
import React, { useState } from 'react';
import Form from '@/app/ui/home_account/reportdesign/1_main_info_form';
import FilterForm from '@/app/ui/home_account/reportdesign/3_tab2_filter-form';
import { ArrowUturnLeftIcon, RectangleGroupIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ButtonSave } from '@/app/ui/button';
import FieldButtons from '@/app/ui/home_account/reportdesign/3_tab1_FieldButtons';
import SelectedFields from '@/app/ui/home_account/reportdesign/2_SelectedFields';
import ClassMappingSelection from '@/app/ui/home_account/configuration/configuration-tab-classmapping_selection'; // Updated import
import ClassMappingTable from '@/app/ui/home_account/configuration/configuration-tab-classmapping_table'; // Updated import
// import AgencyGroup from '@/app/ui/home_account/configuration/configuration-tab-agencygroup'; // Updated import



const ConfigurationLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0); // Step 4: Add state for active tab

  return (
    <main>   
      <div className="flex flex-col mt-6 mr-4 h-full overflow-y-auto">
        {/* TAB NAMES */}
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab(0)}
            className={`px-4 py-2 ${activeTab === 0 ? 'rounded-t-lg border-b-4 border-purple-500 bg-white text-purple-500' : 'rounded-t-lg bg-gray-200'}`}
          >
            Agency Grouping
          </button>
          <button
            onClick={() => setActiveTab(1)}
            className={`px-4 py-2 ${activeTab === 1 ? 'rounded-t-lg border-b-4 border-purple-500 bg-white text-purple-500' : 'rounded-t-lg bg-gray-200'}`}
          >
            Class Mapping
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={`px-4 py-2 ${activeTab === 2 ? 'rounded-t-lg border-b-4 border-purple-500 bg-white text-purple-500' : 'rounded-t-lg bg-gray-200'}`}
          >
            Airline Groupings
          </button>
          <button
            onClick={() => setActiveTab(3)}
            className={`px-4 py-2 ${activeTab === 3 ? 'rounded-t-lg border-b-4 border-purple-500 bg-white text-purple-500' : 'rounded-t-lg bg-gray-200'}`}
          >
            Geographical Groupings
          </button>
        </div>

        {/* TAB CONTENT */}
        <div className="bg-white rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-lg">
          {/* TAB 1 */}
          {activeTab === 0 && (
            <div className="flex flex-col w-full p-6 bg-white rounded space-y-4">
              <div className="flex flex-col w-full p-6 items-center bg-white rounded space-y-4"> 
                {/* <AgencyGroup /> */}
              </div>
                 </div>
          )}

          {/* TAB 2 */}   
          {activeTab === 1 && (
            <div className="flex flex-col w-full p-2 bg-white rounded">
              <div className="flex flex-col w-full p-4 items-center bg-white rounded space-y-2"> 
                <ClassMappingSelection />
              </div>
              <div className="flex flex-col w-full p-4 items-center bg-white rounded space-y-2"> 
             
                <ClassMappingTable />
              </div>
              
            </div>
          )}

          {/* TAB 3 */}   
          {activeTab === 2 && (
            <div className="flex flex-col w-full p-6 bg-white rounded space-y-4">
              <div className="flex flex-col w-full p-6 items-center bg-white rounded space-y-4"> 
                <p>content</p>
              </div>
              <p>content</p>
            </div>
          )}

          {/* TAB 4 */} 
          {activeTab === 3 && (
            <div className="flex flex-col w-full p-6 bg-white rounded space-y-4">
              <div className="flex flex-col w-full p-6 items-center bg-white rounded space-y-4"> 
                <p>content</p>
              </div>
              <p>content</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ConfigurationLayout;
