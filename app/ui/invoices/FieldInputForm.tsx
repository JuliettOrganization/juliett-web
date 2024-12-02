'use client';
import React, { useState } from 'react';
import FieldButtons from './FieldButtons';
import SelectedFields from './SelectedFields';

const FieldInputForm: React.FC = () => {
  const [fields, setFields] = useState<string[]>([]);

  const addTag = (field: string) => {
    if (!fields.includes(field)) {
      setFields([...fields, field]);
    }
  };

  const removeField = (field: string) => {
    setFields(fields.filter((t) => t !== field));
  };

  return (
    <>
      <FieldButtons addTag={addTag} />
      <SelectedFields fields={fields} removeField={removeField} />
    </>
  );
};

export default FieldInputForm;
