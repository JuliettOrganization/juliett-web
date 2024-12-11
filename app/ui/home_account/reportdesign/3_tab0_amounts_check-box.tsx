'use client';
import React, { useState } from 'react';

interface GroupingValuesFilterProps {
  groupingValues: string[];
}

const GroupingValuesFilter: React.FC<GroupingValuesFilterProps> = ({ groupingValues }) => {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const handleCheckboxChange = (group: string) => {
    setSelectedGroups((prevSelected) =>
      prevSelected.includes(group)
        ? prevSelected.filter((g) => g !== group)
        : [...prevSelected, group]
    );
  };

  return (
    <div className="mb-4 mr-2 w-128">
      <label htmlFor="Amounts" className="mb-2 block text-sm font-medium">
        Amounts to be incuded
      </label>
      <div className="flex flex-row space-x-2">
        {groupingValues.map((group, index) => (
          <div key={index} className="flex items-center p-2">
            <input
              id={`group-${index}`}
              name="Amounts"
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
  );
};

const CheckBoxAmount: React.FC = () => {
  const placeholderData = ['Gross', 'Net', 'YQ', 'YR'];
  const [groupingValues, setGroupingValues] = useState<string[]>(placeholderData);

  return <GroupingValuesFilter groupingValues={groupingValues} />;
};

export default CheckBoxAmount;
