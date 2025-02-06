"use client";
import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline"; // <-- Import Heroicon

interface GroupingValuesFilterProps {
  transactionTypes: string[];
  selectedTransactionTypes: string[];
  setSelectedTransactionTypes: (transactionTypes: string[]) => void;
}

const GroupingValuesFilter: React.FC<GroupingValuesFilterProps> = ({
  transactionTypes,
  selectedTransactionTypes,
  setSelectedTransactionTypes,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleCheckboxChange = (type: string) => {
    const updatedTypes = selectedTransactionTypes.includes(type)
      ? selectedTransactionTypes.filter((t) => t !== type)
      : [...selectedTransactionTypes, type];

    setSelectedTransactionTypes(updatedTypes);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="mb-4 mr-2 relative">
      <label htmlFor="Transaction" className="mb-2 block text-sm font-medium">
        Transaction Type Filtering
      </label>
      <div className="flex flex-row w-[25vw] items-center peer cursor-pointer rounded-md border border-gray-200 pt-2 pb-1 pl-2 mr-2 text-sm outline-2 placeholder:text-gray-500">
        <button
          type="button"
          onClick={toggleDropdown}
          className="flex flex-row w-full items-center"
        >
          <span className="truncate">
            {selectedTransactionTypes.length > 0
              ? selectedTransactionTypes.join(", ")
              : "Select Type(s)"}
          </span>
          <ChevronDownIcon className="ml-auto h-6 w-6 pr-2 text-bold text-gray-700" />
        </button>
      </div>

      {isDropdownOpen && (
        <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="max-h-60 pr-6 w-[25vw] overflow-y-auto">
            {transactionTypes.map((type, index) => (
              <div key={index} className="flex items-center p-2">
                <input
                  id={`type-${index}`}
                  name="Transaction"
                  type="checkbox"
                  checked={selectedTransactionTypes.includes(type)}
                  onChange={() => handleCheckboxChange(type)}
                  className="mr-2 cursor-pointer rounded border-gray-200 text-blue-500 focus:ring-blue-500"
                />
                <label
                  htmlFor={`type-${index}`}
                  className="text-sm text-gray-700"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface CheckBoxTransactionTypeProps {
  selectedTransactionTypes: string[];
  setSelectedTransactionTypes: (transactionTypes: string[]) => void;
}

const CheckBoxTransactionType: React.FC<CheckBoxTransactionTypeProps> = ({
  selectedTransactionTypes,
  setSelectedTransactionTypes,
}) => {
  const placeholderData = [
    "Ticket",
    "Refund",
    "ADM",
    "ACM",
    "EMDS",
    "EMDA",
    "Others",
  ];
  const [transactionTypes] = useState<string[]>(placeholderData);

  return (
    <GroupingValuesFilter
      transactionTypes={transactionTypes}
      selectedTransactionTypes={selectedTransactionTypes}
      setSelectedTransactionTypes={setSelectedTransactionTypes}
    />
  );
};

export default CheckBoxTransactionType;
