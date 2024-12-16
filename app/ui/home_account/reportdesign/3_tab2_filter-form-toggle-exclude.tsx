'use client';
import React from 'react';
import { Switch } from '@headlessui/react';
import { useState } from 'react';

interface SwitchExcludeProp {
  onChange: (info: {
    exclude: boolean;
  }) => void;
  initialExclude?: boolean;
}

 export default function ToggleSwitchItinerary ({ onChange,
 
  initialExclude = false, }: SwitchExcludeProp) {
  const [exclude, setExclude] = useState(initialExclude);

  return (
    <div className="flex items-center">
    <label className="block text-sm font-medium text-gray-700 mr-4">Exclude</label>
    <Switch
      checked={exclude}
      onChange={setExclude}
      className={`${exclude ? 'bg-red-600' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">exclude</span>
      <span
        className={`${exclude ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  </div>
  );
};



 

