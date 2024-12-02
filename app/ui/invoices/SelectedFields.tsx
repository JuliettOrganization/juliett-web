'use client';
import React from 'react';

interface SelectedFieldsProps {
  fields: string[];
  removeField: (field: string) => void;
}

const SelectedFields: React.FC<SelectedFieldsProps> = ({ fields, removeField }) => {
  return (
    <div className="p-4 bg-purple-700">
      {fields.length > 0 ? (
        <div>
          <div className="flex flex-wrap gap-2">
            {fields.map((field, index) => (
              <span
                key={index}
                className="bg-purple-200 text-gray-800 rounded-full px-2 py-1 text-sm flex items-center"
              >
                {field}
                <button
                  type="button"
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() => removeField(field)}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      ) : (
        <p className='text-gray-200 text-center'>No fields selected yet</p>
      )}
    </div>
  );
};

export default SelectedFields;
