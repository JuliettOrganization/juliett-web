'use client';
import React, { useState } from 'react';
import FieldButtons from './3_tab1_FieldButtons';


const FieldInputForm: React.FC = () => {
  const availableFields = [ 'agency code (booking)', 'agency code (issuing)', 
    'airline code (marketing)', 'commission (total)', 'coupon number', 'currency code (local)',
     'date (issuing)', 'date (travel)', 'deal code (GNR5)', 'destination (coupon level)',
      'destination airport code (ticket level)', 'destination city code (coupon level)',
       'destination city code (ticket level)', 'destination country code (ticket level)', 
       'destination country code (coupon level)', 'domestic international flag', 
       'EMD remarks', 'endorsement remarks', 'fare basis', 'flight number', 
       'gross amount (local currency)', 'origin (coupon level)', 'origin airport code (ticket level)', 
       'origin city code (coupon level)', 'origin city code (ticket level)', 'origin country code (ticket level)',
        'origin country code (coupon level)', 'passenger date of birth', 'passenger FFP', 'passenger name',
         'passenger PNR', 'passenger Type', 'RBD', 'RDII', 'reason for issuance code', 'Reporting System', 
         'routing', 'Sector Number', 'stopover', 'taxes', 'ticket number (original reference)',
          'ticket number (primary)', 'ticket number (refunded)', 'ticket number (TDNR)', 'tour code', 
          'transaction code', 'yq amount (local currency)', 'yr amount (local currency)'];
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
      <FieldButtons addTag={addTag} fields={availableFields} selectedFields={fields}/>
     
    </>
  );
};

export default FieldInputForm;
