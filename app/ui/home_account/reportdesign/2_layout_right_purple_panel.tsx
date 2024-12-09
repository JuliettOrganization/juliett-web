// 1_layout_right_purple_panel.tsx
import React from 'react';
import { RectangleGroupIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import SelectedFields from '@/app/ui/home_account/reportdesign/2_SelectedFields';
import { ButtonSave } from '@/app/ui/button';

const LayoutRightPurplePanel: React.FC<{ fields: string[], removeField: (field: string) => void }> = ({ fields, removeField }) => {
  return (
    <div className="fixed top-20 right-0 w-48 h-full bg-purple-700">
      <div className="mt-1 flex flex-row text-white font-bold text-2xl p-4 gap-4 items-center">
        <RectangleGroupIcon className="w-7 md:w-9" />
        <p>Group By</p>
      </div>
      <div className="flex flex-col space-y-4 h-3/5 overflow-y-auto">
        <SelectedFields fields={fields} removeField={removeField} />
      </div>
      <div className="absolute bottom-80 bg-red-700 flex flex-col justify-end gap-4 border-b-2 border-white pl-12 pr-24 mr-6 ml-6"></div>
      <div className="absolute bottom-32 flex flex-col gap-4 p-3 mr-6 ml-6">
        <Link
          href="/home_account/reportmanager"
          className="flex h-10 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <ButtonSave className="flex h-10 items-center justify-center rounded-full" type="submit">
          Save Report
        </ButtonSave>
        <ButtonSave className="flex h-10 items-center justify-center rounded-full" type="submit">
          Run Report
        </ButtonSave>
      </div>
    </div>
  );
};

export default LayoutRightPurplePanel;
