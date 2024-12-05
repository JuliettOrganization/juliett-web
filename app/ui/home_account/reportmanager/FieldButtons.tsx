'use client';
import React from 'react';

interface FieldButtonProps {
  text: string;
  onClick: (text: string) => void;
}

const FieldButton: React.FC<FieldButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={() => onClick(text)}
      className="rounded-full items-center bg-white border border-purple-500 hover:bg-purple-500 text-black hover:text-white p-1 text-[12px] m-2 w-52 h-8 truncate whitespace-nowrap overflow-hidden" title={text}>
      {text}
    </button>
  );
};
interface FieldButtonsProps 
{ addTag: (field: string) => void; 
  fields: string[];} // Step 1: Add fields prop 

const FieldButtons: React.FC<FieldButtonsProps> = ({ addTag, fields }) => {
    return (
    <div className="rounded-lg items-center p-1 bg-white">
      <div className="flex flex-wrap h-2/5 overflow-y-auto">
        {fields.map((text, index) => (
<FieldButton key={index} text={text} onClick={addTag} /> // Step 2: Render FieldButton components using fields prop        ))}
      ))}
      </div>
    </div>
  );
};

export default FieldButtons;
