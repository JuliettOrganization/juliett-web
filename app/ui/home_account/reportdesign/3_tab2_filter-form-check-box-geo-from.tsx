'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from '@/app/ui/LoadingSpinner';

interface GroupingValuesFilterProps {
  groupingValuesGeoFrom: string[];
  selectedGroupingValuesGeoFrom: string[];
  setSelectedGroupingValuesGeoFrom: (values: string[]) => void;
  loadingGeoFrom: boolean;
  isDropdownOpenGeoFrom: boolean;
  toggleDropdownGeoFrom: () => void;
}

const GroupingValuesFilter: React.FC<GroupingValuesFilterProps> = ({
  groupingValuesGeoFrom,
  selectedGroupingValuesGeoFrom,
  setSelectedGroupingValuesGeoFrom,
  loadingGeoFrom,
  isDropdownOpenGeoFrom,
  toggleDropdownGeoFrom,
}) => {
  const handleCheckboxChange = (value: string) => {
    const updatedValues = selectedGroupingValuesGeoFrom.includes(value)
      ? selectedGroupingValuesGeoFrom.filter((v) => v !== value)
      : [...selectedGroupingValuesGeoFrom, value];

    setSelectedGroupingValuesGeoFrom(updatedValues);
  };

  return (
    <div className="mb-4 mr-2 relative w-128">
      <label htmlFor="GeoFromGroupingsGeoFrom" className="mb-2 block text-sm font-medium">
      Value Filtering
      </label>
      <div className="flex flex-row w-full items-center peer cursor-pointer bg-white rounded-md border border-gray-200 pt-2 pb-1 pl-2 mr-2 ml-auto text-sm text-left outline-2 placeholder:text-gray-500">
        <button type="button" onClick={toggleDropdownGeoFrom} className="flex flex-row w-full text-ellipsis overflow-hidden whitespace-nowrap space-x-3">
          <span className="truncate">
            {selectedGroupingValuesGeoFrom.length > 0 ? selectedGroupingValuesGeoFrom.join(', ') : 'Select Grouping'}
          </span>
          <div className="flex flex-grow"></div>
          <ChevronDownIcon className="ml-auto mr-6 h-6 w-6 pr-2 text-bold text-gray-700 items-center justify-end" />
        </button>
      </div>

      {isDropdownOpenGeoFrom && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg h-min-40">
          <div className="max-h-60 overflow-y-auto">
            {loadingGeoFrom ? (
              <LoadingSpinner />
            ) : (
              groupingValuesGeoFrom.map((value, index) => (
                <div key={index} className="flex items-center p-2">
                  <input
                    id={`group-${index}`}
                    name="GeoFromGroupingsGeoFrom"
                    type="checkbox"
                    checked={selectedGroupingValuesGeoFrom.includes(value)}
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

interface CheckBoxGeoFromProps {
  selectedGroupingValuesGeoFrom: string[];
  setSelectedGroupingValuesGeoFrom: (values: string[]) => void;
  selectedGroupingGeoFrom: string;
  isDropdownOpenGeoFrom: boolean;
  toggleDropdownGeoFrom: () => void;
}

const CheckBoxGeoFrom: React.FC<CheckBoxGeoFromProps> = ({
  selectedGroupingValuesGeoFrom,
  setSelectedGroupingValuesGeoFrom,
  selectedGroupingGeoFrom,
  isDropdownOpenGeoFrom,
  toggleDropdownGeoFrom,
}) => {
  const [groupingValuesGeoFrom, setGroupingValuesGeoFrom] = useState<string[]>([]);
  const [loadingGeoFrom, setLoadingGeoFrom] = useState<boolean>(false);
  const prevSelectedGroupingGeoFrom = useRef<string>(selectedGroupingGeoFrom);

  useEffect(() => {
    if (selectedGroupingGeoFrom !== '' && selectedGroupingGeoFrom !== prevSelectedGroupingGeoFrom.current) {
      setLoadingGeoFrom(true);
      setSelectedGroupingValuesGeoFrom([]); // Reinitialize checked boxes only if selectedGroupingGeoFrom has changed
      // Fetch actual data from DB
      fetch(`/api/home_account/reportdesign/geofilter/geoGroupingValues?selectedGrouping=${selectedGroupingGeoFrom}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setGroupingValuesGeoFrom(data);
          } else {
            console.error('Unexpected response format:', data);
          }
        })
        .catch((error) => console.error('Error fetching grouping values:', error))
        .finally(() => setLoadingGeoFrom(false));
      prevSelectedGroupingGeoFrom.current = selectedGroupingGeoFrom;
    }
  }, [selectedGroupingGeoFrom, setSelectedGroupingValuesGeoFrom]);

  useEffect(() => {
    if (isDropdownOpenGeoFrom) {
      setLoadingGeoFrom(true);
      // Fetch actual data from DB
      fetch(`/api/home_account/reportdesign/geofilter/geoGroupingValues?selectedGrouping=${selectedGroupingGeoFrom}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setGroupingValuesGeoFrom(data);
          } else {
            console.error('Unexpected response format:', data);
          }
        })
        .catch((error) => console.error('Error fetching grouping values:', error))
        .finally(() => setLoadingGeoFrom(false));
    }
  }, [isDropdownOpenGeoFrom, selectedGroupingGeoFrom]);

  return (
    <GroupingValuesFilter
      groupingValuesGeoFrom={groupingValuesGeoFrom}
      selectedGroupingValuesGeoFrom={selectedGroupingValuesGeoFrom}
      setSelectedGroupingValuesGeoFrom={setSelectedGroupingValuesGeoFrom}
      loadingGeoFrom={loadingGeoFrom}
      isDropdownOpenGeoFrom={isDropdownOpenGeoFrom}
      toggleDropdownGeoFrom={toggleDropdownGeoFrom}
    />
  );
};

export default CheckBoxGeoFrom;