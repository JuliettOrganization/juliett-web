'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from '@/ui_general/LoadingSpinner';

interface GroupingValuesFilterProps {
  groupingValuesAgency: string[];
  selectedGroupingValuesAgency: string[];
  setSelectedGroupingValuesAgency: (values: string[]) => void;
  loadingAgency: boolean;
  isDropdownOpenAgency: boolean;
  toggleDropdownAgency: () => void;
}

const GroupingValuesFilter: React.FC<GroupingValuesFilterProps> = ({
  groupingValuesAgency,
  selectedGroupingValuesAgency,
  setSelectedGroupingValuesAgency,
  loadingAgency,
  isDropdownOpenAgency,
  toggleDropdownAgency,
}) => {
  const handleCheckboxChange = (value: string) => {
    const updatedValues = selectedGroupingValuesAgency.includes(value)
      ? selectedGroupingValuesAgency.filter((v) => v !== value)
      : [...selectedGroupingValuesAgency, value];

    setSelectedGroupingValuesAgency(updatedValues);
  };

  return (
    <div className="mb-4 mr-2 relative w-128">
      <label htmlFor="AgencyGroupingsAgency" className="mb-2 block text-sm font-medium">
        Value Filtering
      </label>
      <div className="flex flex-row w-full items-center peer cursor-pointer bg-white rounded-md border border-gray-200 pt-2 pb-1 pl-2 mr-2 ml-auto text-sm text-left outline-2 placeholder:text-gray-500">
        <button type="button" onClick={toggleDropdownAgency} className="flex flex-row w-full text-ellipsis overflow-hidden whitespace-nowrap space-x-3">
          <span className="truncate">
            {selectedGroupingValuesAgency.length > 0 ? selectedGroupingValuesAgency.join(', ') : 'Select Grouping'}
          </span>
          <div className="flex flex-grow"></div>
          <ChevronDownIcon className="ml-auto mr-6 h-6 w-6 pr-2 text-bold text-gray-700 items-center justify-end" />
        </button>
      </div>

      {isDropdownOpenAgency && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg h-min-40">
          <div className="max-h-60 overflow-y-auto">
            {loadingAgency ? (
              <LoadingSpinner />
            ) : (
              groupingValuesAgency.map((value, index) => (
                <div key={index} className="flex items-center p-2">
                  <input
                    id={`group-${index}`}
                    name="AgencyGroupingsAgency"
                    type="checkbox"
                    checked={selectedGroupingValuesAgency.includes(value)}
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

interface CheckBoxAgencyProps {
  selectedGroupingValuesAgency: string[];
  setSelectedGroupingValuesAgency: (values: string[]) => void;
  selectedGroupingAgency: string;
  isDropdownOpenAgency: boolean;
  toggleDropdownAgency: () => void;
}

const CheckBoxAgency: React.FC<CheckBoxAgencyProps> = ({
  selectedGroupingValuesAgency,
  setSelectedGroupingValuesAgency,
  selectedGroupingAgency,
  isDropdownOpenAgency,
  toggleDropdownAgency,
}) => {
  const [groupingValuesAgency, setGroupingValuesAgency] = useState<string[]>([]);
  const [loadingAgency, setLoadingAgency] = useState<boolean>(false);
  const prevSelectedGroupingAgency = useRef<string>(selectedGroupingAgency);

   useEffect(() => {
     if (selectedGroupingAgency !== '' && selectedGroupingAgency !== prevSelectedGroupingAgency.current) {
       setLoadingAgency(true);
       setSelectedGroupingValuesAgency([]); // Reinitialize checked boxes only if selectedGroupingAgency has changed
       // Fetch actual data from DB
       fetch(`/api/home_account/reportdesign/airlinefilter/airlineGroupingValues?selectedGrouping=${selectedGroupingAgency}`)
         .then((response) => response.json())
         .then((data) => {
           if (Array.isArray(data)) {
             setGroupingValuesAgency(data);
           } else {
             console.error('Unexpected response format:', data);
           }
         })
         .catch((error) => console.error('Error fetching grouping values:', error))
         .finally(() => setLoadingAgency(false));
       prevSelectedGroupingAgency.current = selectedGroupingAgency;
     }
   }, [selectedGroupingAgency, setSelectedGroupingValuesAgency]);
 
   useEffect(() => {
     if (isDropdownOpenAgency) {
       setLoadingAgency(true);
       // Fetch actual data from DB
       fetch(`/api/home_account/reportdesign/airlinefilter/airlineGroupingValues?selectedGrouping=${selectedGroupingAgency}`)
         .then((response) => response.json())
         .then((data) => {
           if (Array.isArray(data)) {
             setGroupingValuesAgency(data);
           } else {
             console.error('Unexpected response format:', data);
           }
         })
         .catch((error) => console.error('Error fetching grouping values:', error))
         .finally(() => setLoadingAgency(false));
     }
   }, [isDropdownOpenAgency, selectedGroupingAgency]);

  return (
    <GroupingValuesFilter
      groupingValuesAgency={groupingValuesAgency}
      selectedGroupingValuesAgency={selectedGroupingValuesAgency}
      setSelectedGroupingValuesAgency={setSelectedGroupingValuesAgency}
      loadingAgency={loadingAgency}
      isDropdownOpenAgency={isDropdownOpenAgency}
      toggleDropdownAgency={toggleDropdownAgency}
    />
  );
};

export default CheckBoxAgency;