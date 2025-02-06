"use client";
import React from "react";
import clsx from "clsx";

// Assuming you import SelectedFields here, but you will use fields directly passed as props
// import SelectedFields from '@/app/ui/home_account/reportdesign/SelectedFields';

interface FieldButtonProps {
  text: string;
  onClick: (text: string) => void;
  selectedFields: string[]; // Add selectedFields prop
}

const FieldButton: React.FC<FieldButtonProps> = ({
  text,
  onClick,
  selectedFields,
}) => {
  const isSelected = selectedFields.includes(text); // Check if text is in selectedFields
  return (
    <button
      onClick={() => onClick(text)}
      className={clsx(
        "rounded-full items-center border border-gray-400 hover:bg-gray-500 text-gray-600 shadow hover:text-white p-1 text-[12px] m-2 w-52 h-8 truncate whitespace-nowrap overflow-hidden",
        {
          "bg-gray-400 text-white shadow": isSelected,
        },
      )}
      title={text}
    >
      {text}
    </button>
  );
};

interface FieldButtonsProps {
  addTag: (field: string) => void;
  fields: string[];
  selectedFields: string[]; // Add selectedFields prop
}

const FieldButtons: React.FC<FieldButtonsProps> = ({
  addTag,
  fields,
  selectedFields,
}) => {
  return (
    <div className="rounded-lg items-center justify-center p-1 bg-white">
      <div className="flex flex-wrap justify-center overflow-y-auto h-[40vh]">
        {fields.map((text, index) => (
          <FieldButton
            key={index}
            text={text}
            onClick={addTag}
            selectedFields={selectedFields} // Pass selectedFields to FieldButton
          />
        ))}
      </div>
    </div>
  );
};

export default FieldButtons;
