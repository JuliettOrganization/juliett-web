// 1_layout_main_info_form.tsx
import React from 'react';
import Form from '@/app/ui/home_account/reportdesign/1_main_info_form';

const LayoutMainInfoForm: React.FC = () => {
  return (
    <div className="flex flex-col mt-4 mr-48 bg-white rounded-md border overflow-y-auto shadow-lg">
      <Form />
    </div>
  );
};

export default LayoutMainInfoForm;
