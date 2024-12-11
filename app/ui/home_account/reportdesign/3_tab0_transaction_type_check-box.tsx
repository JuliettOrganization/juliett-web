'use client';
import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline'; // <-- Import Heroicon

interface GroupingValuesFilterProps {
  groupingValues: string[];
}

const GroupingValuesFilter: React.FC<GroupingValuesFilterProps> = ({ groupingValues }) => {
  // Initialize selectedGroups with "Ticket" selected by default
  const [selectedGroups, setSelectedGroups] = useState<string[]>(['Ticket']);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleCheckboxChange = (group: string) => {
    setSelectedGroups((prevSelected) =>
      prevSelected.includes(group)
        ? prevSelected.filter((g) => g !== group)
        : [...prevSelected, group]
    );
  };

  const toggleDropdown = () => { setIsDropdownOpen(!isDropdownOpen); };

  return (
    <div className="mb-4 mr-2 relative">
      <label htmlFor="Transaction" className="mb-2 block text-sm font-medium">
        Transaction Type Filtering
      </label>
      <div className="flex flex-row w-[25vw] items-center peer cursor-pointer rounded-md border border-gray-200 pt-2 pb-1 pl-2 mr-2 text-sm outline-2 placeholder:text-gray-500">
        <button type="button" onClick={toggleDropdown} className="flex flex-row w-full items-center">
          <span className="truncate">
            {selectedGroups.length > 0 ? selectedGroups.join(', ') : 'Select Type(s)'}
          </span>
          <ChevronDownIcon className="ml-auto h-6 w-6 pr-2 text-bold text-gray-700" />
        </button>
      </div>

      {isDropdownOpen && (
        <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="max-h-60 pr-6 w-[25vw] overflow-y-auto">
            {groupingValues.map((group, index) => (
              <div key={index} className="flex items-center p-2">
                <input
                  id={`group-${index}`}
                  name="Transaction"
                  type="checkbox"
                  checked={selectedGroups.includes(group)}
                  onChange={() => handleCheckboxChange(group)}
                  className="mr-2 cursor-pointer rounded border-gray-200 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor={`group-${index}`} className="text-sm text-gray-700">
                  {group}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const CheckBoxTransactionType: React.FC = () => {
  const placeholderData = ['Ticket', 'Refund', 'ADM', 'ACM', 'EMDS', 'EMDA', 'Others'];
  const [groupingValues] = useState<string[]>(placeholderData);

//   THIS IS TO FETCH THE DATA FROM DB INF HARDCODIG THE GROUPIING VALUES
//   useEffect(() => {
//     // Fetch actual data from DB
//     fetch('/api/grouping-values')
//       .then(response => response.json())
//       .then(data => setGroupingValues(data))
//       .catch(error => console.error('Error fetching grouping values:', error));
//   }, []);

  return <GroupingValuesFilter groupingValues={groupingValues} />;
};

export default CheckBoxTransactionType;
