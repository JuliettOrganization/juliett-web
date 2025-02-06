'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from '@/ui_general/LoadingSpinner';

interface GroupingValuesFilterProps {
  groupingValuesMarketing: string[];
  selectedGroupingValuesMarketing: string[];
  setSelectedGroupingValuesMarketing: (values: string[]) => void;
  loadingMarketing: boolean;
  isDropdownOpenMarketing: boolean;
  toggleDropdownMarketing: () => void;
}

const GroupingValuesFilter: React.FC<GroupingValuesFilterProps> = ({
  groupingValuesMarketing,
  selectedGroupingValuesMarketing,
  setSelectedGroupingValuesMarketing,
  loadingMarketing,
  isDropdownOpenMarketing,
  toggleDropdownMarketing,
}) => {
  const handleCheckboxChange = (value: string) => {
    const updatedValues = selectedGroupingValuesMarketing.includes(value)
      ? selectedGroupingValuesMarketing.filter((v) => v !== value)
      : [...selectedGroupingValuesMarketing, value];

    setSelectedGroupingValuesMarketing(updatedValues);
  };

  return (
    <div className="mb-4 mr-2 relative w-128">
      <label htmlFor="AirlineGroupingsMarketing" className="mb-2 block text-sm font-medium">
      Value Filtering
      </label>
      <div className="flex flex-row w-full items-center peer cursor-pointer bg-white rounded-md border border-gray-200 pt-2 pb-1 pl-2 mr-2 ml-auto text-sm text-left outline-2 placeholder:text-gray-500">
        <button type="button" onClick={toggleDropdownMarketing} className="flex flex-row w-full text-ellipsis overflow-hidden whitespace-nowrap space-x-3">
          <span className="truncate">
            {selectedGroupingValuesMarketing.length > 0 ? selectedGroupingValuesMarketing.join(', ') : 'Select Grouping'}
          </span>  
          <div className="flex flex-grow"></div>
          <ChevronDownIcon className="ml-auto mr-6 h-6 w-6 pr-2 text-bold text-gray-700 items-center justify-end" />
        </button>
      </div>

      {isDropdownOpenMarketing && (
        <div className="absolute  z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg h-min-40">
          <div className="max-h-60 overflow-y-auto">
            {loadingMarketing ? (
              <LoadingSpinner />
            ) : (
              groupingValuesMarketing.map((value, index) => (
                <div key={index} className="flex items-center p-2">
                  <input
                    id={`group-${index}`}
                    name="AirlineGroupingsMarketing"
                    type="checkbox"
                    checked={selectedGroupingValuesMarketing.includes(value)}
                    onChange={() => handleCheckboxChange(value)}
                    className="mr-2 cursor-pointer rounded border-gray-200 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`group-${index}`} className="text-sm text-gray-700">
                    {value}
                  </label>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface CheckBoxMarketingProps {
  selectedGroupingValuesMarketing: string[];
  setSelectedGroupingValuesMarketing: (values: string[]) => void;
  selectedGroupingMarketing: string;
  isDropdownOpenMarketing: boolean;
  toggleDropdownMarketing: () => void;
}

const CheckBoxMarketing: React.FC<CheckBoxMarketingProps> = ({
  selectedGroupingValuesMarketing,
  setSelectedGroupingValuesMarketing,
  selectedGroupingMarketing,
  isDropdownOpenMarketing,
  toggleDropdownMarketing,
}) => {
  const [groupingValuesMarketing, setGroupingValuesMarketing] = useState<string[]>([]);
  const [loadingMarketing, setLoadingMarketing] = useState<boolean>(false);
  const prevSelectedGroupingMarketing = useRef<string>(selectedGroupingMarketing);

   useEffect(() => {
     if (selectedGroupingMarketing !== '' && selectedGroupingMarketing !== prevSelectedGroupingMarketing.current) {
       setLoadingMarketing(true);
       setSelectedGroupingValuesMarketing([]); // Reinitialize checked boxes only if selectedGroupingMarketing has changed
       // Fetch actual data from DB
       fetch(`/api/home_account/reportdesign/airlinefilter/airlineGroupingValues?selectedGrouping=${selectedGroupingMarketing}`)
         .then((response) => response.json())
         .then((data) => {
           if (Array.isArray(data)) {
             setGroupingValuesMarketing(data);
           } else {
             console.error('Unexpected response format:', data);
           }
         })
         .catch((error) => console.error('Error fetching grouping values:', error))
         .finally(() => setLoadingMarketing(false));
       prevSelectedGroupingMarketing.current = selectedGroupingMarketing;
     }
   }, [selectedGroupingMarketing, setSelectedGroupingValuesMarketing]);
 
   useEffect(() => {
     if (isDropdownOpenMarketing) {
       setLoadingMarketing(true);
       // Fetch actual data from DB
       fetch(`/api/home_account/reportdesign/airlinefilter/airlineGroupingValues?selectedGrouping=${selectedGroupingMarketing}`)
         .then((response) => response.json())
         .then((data) => {
           if (Array.isArray(data)) {
             setGroupingValuesMarketing(data);
           } else {
             console.error('Unexpected response format:', data);
           }
         })
         .catch((error) => console.error('Error fetching grouping values:', error))
         .finally(() => setLoadingMarketing(false));
     }
   }, [isDropdownOpenMarketing, selectedGroupingMarketing]);

  return (
    <GroupingValuesFilter
      groupingValuesMarketing={groupingValuesMarketing}
      selectedGroupingValuesMarketing={selectedGroupingValuesMarketing}
      setSelectedGroupingValuesMarketing={setSelectedGroupingValuesMarketing}
      loadingMarketing={loadingMarketing}
      isDropdownOpenMarketing={isDropdownOpenMarketing}
      toggleDropdownMarketing={toggleDropdownMarketing}
    />
  );
};

export default CheckBoxMarketing;