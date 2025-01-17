'use client';
import React from 'react';

interface SelectedFieldsProps {
  fields: string[];
  removeField: (field: string) => void;
}

const SelectedFields: React.FC<SelectedFieldsProps> = ({ fields, removeField }) => {
  return (
    <div className="items-center justify-center">
      {fields.length > 0 ? (
        <div>
          <div className="flex flex-col gap-2 p-1 justify-center items-center">
            {fields.map((field, index) => (
              <span
                key={index}
                className="flex flex-row bg-gray-200 text-gray-800 justify-end rounded-full text-xs items-center w-full box-border">
                  <div   className="text-gray-800 pl-2 py-1 mr-2 ml-1 text-xs items-center w-full box-border">{field}</div>
                
                <button
                  type="button"
                  className="flex text-white text-bold bg-gray-700 justify-center rounded-full h-4 w-4 p-1 m-1 items-center text-sm hover:bg-red-500"
                  
                  onClick={() => removeField(field)}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      ) : (
        <p className='text-gray-200 text-center'>No field selected yet</p>
      )}
    </div>
  );
};

export default SelectedFields;
