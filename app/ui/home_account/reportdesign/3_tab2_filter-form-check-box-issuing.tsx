'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from '@/app/ui/LoadingSpinner';

interface GroupingValuesFilterProps {
  groupingValuesIssuing: string[];
  selectedGroupingValuesIssuing: string[];
  setSelectedGroupingValuesIssuing: (values: string[]) => void;
  loadingIssuing: boolean;
  isDropdownOpenIssuing: boolean;
  toggleDropdownIssuing: () => void;
}

const GroupingValuesFilter: React.FC<GroupingValuesFilterProps> = ({
  groupingValuesIssuing,
  selectedGroupingValuesIssuing,
  setSelectedGroupingValuesIssuing,
  loadingIssuing,
  isDropdownOpenIssuing,
  toggleDropdownIssuing,
}) => {
  const handleCheckboxChange = (value: string) => {
    const updatedValues = selectedGroupingValuesIssuing.includes(value)
      ? selectedGroupingValuesIssuing.filter((v) => v !== value)
      : [...selectedGroupingValuesIssuing, value];

    setSelectedGroupingValuesIssuing(updatedValues);
  };

  return (
    <div className="mb-4 mr-2 relative w-128">
      <label htmlFor="AirlineGroupingsIssuing" className="mb-2 block text-sm font-medium">
      Value Filtering
      </label>
      <div className="flex flex-row w-full items-center peer cursor-pointer bg-white rounded-md border border-gray-200 pt-2 pb-1 pl-2 mr-2 ml-auto text-sm text-left outline-2 placeholder:text-gray-500">
        <button type="button" onClick={toggleDropdownIssuing} className="flex flex-row w-full text-ellipsis overflow-hidden whitespace-nowrap space-x-3">
          <span className="truncate">
            {selectedGroupingValuesIssuing.length > 0 ? selectedGroupingValuesIssuing.join(', ') : 'Select Grouping'}
          </span>
          <div className="flex flex-grow"></div>
          <ChevronDownIcon className="ml-auto mr-6 h-6 w-6 pr-2 text-bold text-gray-700 items-center justify-end" />
        </button>
      </div>

      {isDropdownOpenIssuing && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg h-min-40">
          <div className="max-h-60 overflow-y-auto">
            {loadingIssuing ? (
              <LoadingSpinner />
            ) : (
              groupingValuesIssuing.map((value, index) => (
                <div key={index} className="flex items-center p-2">
                  <input
                    id={`group-${index}`}
                    name="AirlineGroupingsIssuing"
                    type="checkbox"
                    checked={selectedGroupingValuesIssuing.includes(value)}
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

interface CheckBoxIssuingProps {
  selectedGroupingValuesIssuing: string[];
  setSelectedGroupingValuesIssuing: (values: string[]) => void;
  selectedGroupingIssuing: string;
  isDropdownOpenIssuing: boolean;
  toggleDropdownIssuing: () => void;
}

const CheckBoxIssuing: React.FC<CheckBoxIssuingProps> = ({
  selectedGroupingValuesIssuing,
  setSelectedGroupingValuesIssuing,
  selectedGroupingIssuing,
  isDropdownOpenIssuing,
  toggleDropdownIssuing,
}) => {
  const [groupingValuesIssuing, setGroupingValuesIssuing] = useState<string[]>([]);
  const [loadingIssuing, setLoadingIssuing] = useState<boolean>(false);
  const prevSelectedGroupingIssuing = useRef<string>(selectedGroupingIssuing);

  useEffect(() => {
    if (selectedGroupingIssuing !== '' && selectedGroupingIssuing !== prevSelectedGroupingIssuing.current) {
      setLoadingIssuing(true);
      setSelectedGroupingValuesIssuing([]); // Reinitialize checked boxes only if selectedGroupingIssuing has changed
      // Fetch actual data from DB
      fetch(`/api/home_account/reportdesign/airlinefilter/airlineGroupingValues?selectedGrouping=${selectedGroupingIssuing}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setGroupingValuesIssuing(data);
          } else {
            console.error('Unexpected response format:', data);
          }
        })
        .catch((error) => console.error('Error fetching grouping values:', error))
        .finally(() => setLoadingIssuing(false));
      prevSelectedGroupingIssuing.current = selectedGroupingIssuing;
    }
  }, [selectedGroupingIssuing, setSelectedGroupingValuesIssuing]);

  useEffect(() => {
    if (isDropdownOpenIssuing) {
      setLoadingIssuing(true);
      // Fetch actual data from DB
      fetch(`/api/home_account/reportdesign/airlinefilter/airlineGroupingValues?selectedGrouping=${selectedGroupingIssuing}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setGroupingValuesIssuing(data);
          } else {
            console.error('Unexpected response format:', data);
          }
        })
        .catch((error) => console.error('Error fetching grouping values:', error))
        .finally(() => setLoadingIssuing(false));
    }
  }, [isDropdownOpenIssuing, selectedGroupingIssuing]);

  return (
    <GroupingValuesFilter
      groupingValuesIssuing={groupingValuesIssuing}
      selectedGroupingValuesIssuing={selectedGroupingValuesIssuing}
      setSelectedGroupingValuesIssuing={setSelectedGroupingValuesIssuing}
      loadingIssuing={loadingIssuing}
      isDropdownOpenIssuing={isDropdownOpenIssuing}
      toggleDropdownIssuing={toggleDropdownIssuing}
    />
  );
};

export default CheckBoxIssuing;