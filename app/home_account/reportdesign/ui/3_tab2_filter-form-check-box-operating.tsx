'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from '@/ui_general/LoadingSpinner';

interface GroupingValuesFilterProps {
  groupingValuesOperating: string[];
  selectedGroupingValuesOperating: string[];
  setSelectedGroupingValuesOperating: (values: string[]) => void;
  loadingOperating: boolean;
  isDropdownOpenOperating: boolean;
  toggleDropdownOperating: () => void;
}

const GroupingValuesFilter: React.FC<GroupingValuesFilterProps> = ({
  groupingValuesOperating,
  selectedGroupingValuesOperating,
  setSelectedGroupingValuesOperating,
  loadingOperating,
  isDropdownOpenOperating,
  toggleDropdownOperating,
}) => {
  const handleCheckboxChange = (value: string) => {
    const updatedValues = selectedGroupingValuesOperating.includes(value)
      ? selectedGroupingValuesOperating.filter((v) => v !== value)
      : [...selectedGroupingValuesOperating, value];

    setSelectedGroupingValuesOperating(updatedValues);
  };

  return (
    <div className="mb-4 mr-2 relative w-128">
      <label htmlFor="AirlineGroupingsOperating" className="mb-2 block text-sm font-medium">
      Value Filtering
      </label>
      <div className="flex flex-row w-full items-center peer cursor-pointer bg-white rounded-md border border-gray-200 pt-2 pb-1 pl-2 mr-2 ml-auto text-sm text-left outline-2 placeholder:text-gray-500">
        <button type="button" onClick={toggleDropdownOperating} className="flex flex-row w-full text-ellipsis overflow-hidden whitespace-nowrap space-x-3">
          <span className="truncate">
            {selectedGroupingValuesOperating.length > 0 ? selectedGroupingValuesOperating.join(', ') : 'Select Grouping'}
          </span> 
          <div className="flex flex-grow"></div>
          <ChevronDownIcon className="ml-auto mr-6 h-6 w-6 pr-2 text-bold text-gray-700 items-center justify-end" />
        </button>
      </div>

      {isDropdownOpenOperating && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg h-min-40">
          <div className="max-h-60 overflow-y-auto">
            {loadingOperating ? (
              <LoadingSpinner />
            ) : (
              groupingValuesOperating.map((value, index) => (
                <div key={index} className="flex items-center p-2">
                  <input
                    id={`group-${index}`}
                    name="AirlineGroupingsOperating"
                    type="checkbox"
                    checked={selectedGroupingValuesOperating.includes(value)}
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

interface CheckBoxOperatingProps {
  selectedGroupingValuesOperating: string[];
  setSelectedGroupingValuesOperating: (values: string[]) => void;
  selectedGroupingOperating: string;
  isDropdownOpenOperating: boolean;
  toggleDropdownOperating: () => void;
}

const CheckBoxOperating: React.FC<CheckBoxOperatingProps> = ({
  selectedGroupingValuesOperating,
  setSelectedGroupingValuesOperating,
  selectedGroupingOperating,
  isDropdownOpenOperating,
  toggleDropdownOperating,
}) => {
  const [groupingValuesOperating, setGroupingValuesOperating] = useState<string[]>([]);
  const [loadingOperating, setLoadingOperating] = useState<boolean>(false);
  const prevSelectedGroupingOperating = useRef<string>(selectedGroupingOperating);

  useEffect(() => {
    if (selectedGroupingOperating !== '' && selectedGroupingOperating !== prevSelectedGroupingOperating.current) {
      setLoadingOperating(true);
      setSelectedGroupingValuesOperating([]); // Reinitialize checked boxes only if selectedGroupingOperating has changed
      // Fetch actual data from DB
      fetch(`/api/home_account/reportdesign/airlinefilter/airlineGroupingValues?selectedGrouping=${selectedGroupingOperating}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setGroupingValuesOperating(data);
          } else {
            console.error('Unexpected response format:', data);
          }
        })
        .catch((error) => console.error('Error fetching grouping values:', error))
        .finally(() => setLoadingOperating(false));
      prevSelectedGroupingOperating.current = selectedGroupingOperating;
    }
  }, [selectedGroupingOperating, setSelectedGroupingValuesOperating]);

  useEffect(() => {
    if (isDropdownOpenOperating) {
      setLoadingOperating(true);
      // Fetch actual data from DB
      fetch(`/api/home_account/reportdesign/airlinefilter/airlineGroupingValues?selectedGrouping=${selectedGroupingOperating}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setGroupingValuesOperating(data);
          } else {
            console.error('Unexpected response format:', data);
          }
        })
        .catch((error) => console.error('Error fetching grouping values:', error))
        .finally(() => setLoadingOperating(false));
    }
  }, [isDropdownOpenOperating, selectedGroupingOperating]);

  return (
    <GroupingValuesFilter
      groupingValuesOperating={groupingValuesOperating}
      selectedGroupingValuesOperating={selectedGroupingValuesOperating}
      setSelectedGroupingValuesOperating={setSelectedGroupingValuesOperating}
      loadingOperating={loadingOperating}
      isDropdownOpenOperating={isDropdownOpenOperating}
      toggleDropdownOperating={toggleDropdownOperating}
    />
  );
};

export default CheckBoxOperating;