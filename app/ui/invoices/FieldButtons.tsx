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
      className="rounded-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2"
    >
      {text}
    </button>
  );
};

const FieldButtons: React.FC<{ addTag: (field: string) => void }> = ({ addTag }) => {
  return (
    <div className="p-4 bg-gray-50">
      <div className="flex flex-wrap">
        {['ticket number', 'agency', 'code', 'route','routed'].map((text, index) => (
          <FieldButton key={index} text={text} onClick={addTag} />
        ))}
      </div>
    </div>
  );
};

export default FieldButtons;
