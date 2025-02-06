"use client";
import React, { useState, useEffect } from "react";

interface GroupingValuesFilterProps {
  amountTypes: string[];
  selectedAmounts: string[];
  setSelectedAmounts: (amounts: string[]) => void;
}

const GroupingValuesFilter: React.FC<GroupingValuesFilterProps> = ({
  amountTypes,
  selectedAmounts,
  setSelectedAmounts,
}) => {
  const handleCheckboxChange = (amount: string) => {
    const updatedAmounts = selectedAmounts.includes(amount)
      ? selectedAmounts.filter((a) => a !== amount)
      : [...selectedAmounts, amount];

    setSelectedAmounts(updatedAmounts);
  };

  return (
    <div className="mb-4 mr-2 w-128">
      <label htmlFor="Amounts" className="mb-2 block text-sm font-medium">
        Amounts to be included
      </label>
      <div className="flex flex-row space-x-2">
        {amountTypes.map((amount, index) => (
          <div key={index} className="flex items-center p-2">
            <input
              id={`amount-${index}`}
              name="Amounts"
              type="checkbox"
              checked={selectedAmounts.includes(amount)}
              onChange={() => handleCheckboxChange(amount)}
              className="mr-2 cursor-pointer rounded border-gray-200 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor={`amount-${index}`}
              className="text-sm text-gray-700"
            >
              {amount}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

interface CheckBoxAmountProps {
  selectedAmounts: string[];
  setSelectedAmounts: (amounts: string[]) => void;
}

const CheckBoxAmount: React.FC<CheckBoxAmountProps> = ({
  selectedAmounts,
  setSelectedAmounts,
}) => {
  const placeholderData = [
    "Gross Amount",
    "Net Amount",
    "Tax Amount",
    "Commission Amount",
  ];
  const [amountTypes] = useState<string[]>(placeholderData);

  return (
    <GroupingValuesFilter
      amountTypes={amountTypes}
      selectedAmounts={selectedAmounts}
      setSelectedAmounts={setSelectedAmounts}
    />
  );
};

export default CheckBoxAmount;
