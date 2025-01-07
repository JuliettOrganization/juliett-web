'use client';
import React, { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';

interface SwitchExcludeProp {
  ODfiltering: string;
  setODfiltering: (value: string) => void;
}

export default function ToggleSwitchItinerary({ ODfiltering, setODfiltering }: SwitchExcludeProp) {
  const [exclude, setExclude] = useState(ODfiltering === 'Exclude');

  useEffect(() => {
    setODfiltering(exclude ? 'Exclude' : 'Include');
  }, [exclude, setODfiltering]);

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
}