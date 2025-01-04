// 1_layout_main_info_form.tsx
import React from 'react';
import ReportMainInfo from '@/app/ui/home_account/reportdesign/1_main_info_form';

const LayoutMainInfoForm: React.FC = () => {
  return (
    <div className="flex flex-col mb-10 bg-white rounded-md border overflow-y-auto shadow-lg">
      <ReportMainInfo />
    </div>
  );
};

export default LayoutMainInfoForm;
