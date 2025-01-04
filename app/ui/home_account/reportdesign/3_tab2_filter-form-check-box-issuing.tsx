'use client';
import React, { useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from '@/app/ui/LoadingSpinner';

interface GroupingValuesFilterProps {
  groupingValuesIssuing: string[];
  selectedGroupingValuesIssuing: string[];
  setSelectedGroupingValuesIssuing: (values: string[]) => void;
  loading: boolean;
}


const GroupingValuesFilter: React.FC<GroupingValuesFilterProps> = ({
  groupingValuesIssuing, 
  selectedGroupingValuesIssuing, 
  setSelectedGroupingValuesIssuing,
  loading }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleCheckboxChange = (value: string) => {
    const updatedValues = selectedGroupingValuesIssuing.includes(value)
      ? selectedGroupingValuesIssuing.filter((v) => v !== value)
      : [...selectedGroupingValuesIssuing, value];

    setSelectedGroupingValuesIssuing(updatedValues);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="mb-4 mr-2 relative">
      <label htmlFor="AirlineGroupingsIssuing" className="mb-2 block text-sm font-medium">
        Issuing Airline
      </label>
      <div className="flex flex-row w-full items-center peer cursor-pointer bg-white rounded-md border border-gray-200 pt-2 pb-1 pl-2 mr-2 ml-auto text-sm text-left outline-2 placeholder:text-gray-500">
        <button type="button" onClick={toggleDropdown} className="flex flex-row w-full text-ellipsis overflow-hidden whitespace-nowrap space-x-3">
          <span className="truncate">
            {selectedGroupingValuesIssuing.length > 0 ? selectedGroupingValuesIssuing.join(', ') : 'Select Grouping'}
          </span>
          <ChevronDownIcon className="ml-auto mr-6 h-6 w-6 pr-2 text-bold text-gray-700 items-center justify-end" />
        </button>
      </div>

      {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="max-h-60 overflow-y-auto">
          {loading ? (
                <LoadingSpinner />
            ) : (groupingValuesIssuing.map((value, index) => (
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
            )))}
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
}

const CheckBoxIssuing: React.FC<CheckBoxIssuingProps> = ({ 
  selectedGroupingValuesIssuing, setSelectedGroupingValuesIssuing, selectedGroupingIssuing }) => {
  const [groupingValuesIssuing, setGroupingValuesIssuing] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedGroupingIssuing !== 'None') {
      setLoading(true);
      setSelectedGroupingValuesIssuing([]); // Reinitialize checked boxes
      // Fetch actual data from DB
      fetch(`/api/home_account/reportdesign/airlinefilter/airlineGroupingValues?selectedGrouping=${selectedGroupingIssuing}`)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) {
            setGroupingValuesIssuing(data);
          } else {
            console.error('Unexpected response format:', data);
          }
        })
        .catch(error => console.error('Error fetching grouping values:', error))
        .finally(() => setLoading(false));
    }
  }, [selectedGroupingIssuing,setSelectedGroupingValuesIssuing]);

  return <GroupingValuesFilter 
  groupingValuesIssuing={groupingValuesIssuing} 
  selectedGroupingValuesIssuing={selectedGroupingValuesIssuing} 
  setSelectedGroupingValuesIssuing={setSelectedGroupingValuesIssuing} 
  loading={loading}/>;
};

export default CheckBoxIssuing;