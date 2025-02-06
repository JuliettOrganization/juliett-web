'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from '@/ui_general/LoadingSpinner';

interface GroupingValuesFilterProps {
  groupingValuesGeoTo: string[];
  selectedGroupingValuesGeoTo: string[];
  setSelectedGroupingValuesGeoTo: (values: string[]) => void;
  loadingGeoTo: boolean;
  isDropdownOpenGeoTo: boolean;
  toggleDropdownGeoTo: () => void;
}

const GroupingValuesFilter: React.FC<GroupingValuesFilterProps> = ({
  groupingValuesGeoTo,
  selectedGroupingValuesGeoTo,
  setSelectedGroupingValuesGeoTo,
  loadingGeoTo,
  isDropdownOpenGeoTo,
  toggleDropdownGeoTo,
}) => {
  const handleCheckboxChange = (value: string) => {
    const updatedValues = selectedGroupingValuesGeoTo.includes(value)
      ? selectedGroupingValuesGeoTo.filter((v) => v !== value)
      : [...selectedGroupingValuesGeoTo, value];

    setSelectedGroupingValuesGeoTo(updatedValues);
  };

  return (
    <div className="mb-4 mr-2 relative w-128">
      <label htmlFor="GeoToGroupingsGeoTo" className="mb-2 block text-sm font-medium">
      Value Filtering
      </label>
      <div className="flex flex-row w-full items-center peer cursor-pointer bg-white rounded-md border border-gray-200 pt-2 pb-1 pl-2 mr-2 ml-auto text-sm text-left outline-2 placeholder:text-gray-500">
        <button type="button" onClick={toggleDropdownGeoTo} className="flex flex-row w-full text-ellipsis overflow-hidden whitespace-nowrap space-x-3">
          <span className="truncate">
            {selectedGroupingValuesGeoTo.length > 0 ? selectedGroupingValuesGeoTo.join(', ') : 'Select Grouping'}
          </span>
          <div className="flex flex-grow"></div>
          <ChevronDownIcon className="ml-auto mr-6 h-6 w-6 pr-2 text-bold text-gray-700 items-center justify-end" />
        </button>
      </div>

      {isDropdownOpenGeoTo && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg h-min-40">
          <div className="max-h-60 overflow-y-auto">
            {loadingGeoTo ? (
              <LoadingSpinner />
            ) : (
              groupingValuesGeoTo.map((value, index) => (
                <div key={index} className="flex items-center p-2">
                  <input
                    id={`group-${index}`}
                    name="GeoToGroupingsGeoTo"
                    type="checkbox"
                    checked={selectedGroupingValuesGeoTo.includes(value)}
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

interface CheckBoxGeoToProps {
  selectedGroupingValuesGeoTo: string[];
  setSelectedGroupingValuesGeoTo: (values: string[]) => void;
  selectedGroupingGeoTo: string;
  isDropdownOpenGeoTo: boolean;
  toggleDropdownGeoTo: () => void;
}

const CheckBoxGeoTo: React.FC<CheckBoxGeoToProps> = ({
  selectedGroupingValuesGeoTo,
  setSelectedGroupingValuesGeoTo,
  selectedGroupingGeoTo,
  isDropdownOpenGeoTo,
  toggleDropdownGeoTo,
}) => {
  const [groupingValuesGeoTo, setGroupingValuesGeoTo] = useState<string[]>([]);
  const [loadingGeoTo, setLoadingGeoTo] = useState<boolean>(false);
  const prevSelectedGroupingGeoTo = useRef<string>(selectedGroupingGeoTo);

  useEffect(() => {
    if (selectedGroupingGeoTo !== '' && selectedGroupingGeoTo !== prevSelectedGroupingGeoTo.current) {
      setLoadingGeoTo(true);
      setSelectedGroupingValuesGeoTo([]); // Reinitialize checked boxes only if selectedGroupingGeoTo has changed
      // Fetch actual data from DB
      fetch(`/api/home_account/reportdesign/geofilter/geoGroupingValues?selectedGrouping=${selectedGroupingGeoTo}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setGroupingValuesGeoTo(data);
          } else {
            console.error('Unexpected response format:', data);
          }
        })
        .catch((error) => console.error('Error fetching grouping values:', error))
        .finally(() => setLoadingGeoTo(false));
      prevSelectedGroupingGeoTo.current = selectedGroupingGeoTo;
    }
  }, [selectedGroupingGeoTo, setSelectedGroupingValuesGeoTo]);

  useEffect(() => {
    if (isDropdownOpenGeoTo) {
      setLoadingGeoTo(true);
      // Fetch actual data from DB
      fetch(`/api/home_account/reportdesign/geofilter/geoGroupingValues?selectedGrouping=${selectedGroupingGeoTo}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setGroupingValuesGeoTo(data);
          } else {
            console.error('Unexpected response format:', data);
          }
        })
        .catch((error) => console.error('Error fetching grouping values:', error))
        .finally(() => setLoadingGeoTo(false));
    }
  }, [isDropdownOpenGeoTo, selectedGroupingGeoTo]);

  return (
    <GroupingValuesFilter
      groupingValuesGeoTo={groupingValuesGeoTo}
      selectedGroupingValuesGeoTo={selectedGroupingValuesGeoTo}
      setSelectedGroupingValuesGeoTo={setSelectedGroupingValuesGeoTo}
      loadingGeoTo={loadingGeoTo}
      isDropdownOpenGeoTo={isDropdownOpenGeoTo}
      toggleDropdownGeoTo={toggleDropdownGeoTo}
    />
  );
};

export default CheckBoxGeoTo;