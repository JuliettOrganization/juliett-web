'use client';

import { useState, useEffect } from 'react';
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const dataSources = [
  'ABD_3', 'HUN_8', 'USA_1', 'CAN_2', 'MEX_3', 'BRA_4', 'ARG_5', 'CHL_6', 'COL_7', 'PER_8',
  'VEN_9', 'URU_10', 'PAR_11', 'BOL_12', 'ECU_13', 'GTM_14', 'SLV_15', 'HND_16', 'NIC_17', 'CRI_18'
];

interface DataSourcesFormProps {
  onChange: (sources: string[]) => void;
  initialSelectedSources?: string[];
}

export default function DataSourcesForm({
  onChange,
  initialSelectedSources = [],
}: DataSourcesFormProps) {
  const [selectedSources, setSelectedSources] = useState<string[]>(initialSelectedSources);
  const [query, setQuery] = useState('');

  useEffect(() => {
    onChange(selectedSources);
  }, [selectedSources]);

  const filteredSources =
    query === ''
      ? dataSources
      : dataSources.filter((source) =>
          source.toLowerCase().includes(query.toLowerCase())
        );

  const handleSelect = (source: string) => {
    if (!selectedSources.includes(source)) {
      setSelectedSources([...selectedSources, source]);
    }
  };

  const handleRemove = (source: string) => {
    setSelectedSources(selectedSources.filter((s) => s !== source));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-[45vw]">
      <h2 className="text-2xl text-purple-500 font-bold mb-4">Data Sources</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Please select sources</label>
          <Combobox value={selectedSources} onChange={setSelectedSources} multiple>
            <div className="relative mt-1">
              <ComboboxInput
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(event) => setQuery(event.target.value)}
                displayValue={() => ''}
              />
              <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </ComboboxButton>
              <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredSources.map((source) => (
                  <ComboboxOption
                    key={source}
                    value={source}
                    className={({ focus }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        focus ? 'bg-indigo-600 text-white' : 'text-gray-900'
                      }`
                    }
                  >
                    {({ selected, focus }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {source}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                focus ? 'text-white' : 'text-indigo-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </div>
          </Combobox>
        </div>
        <div className="mt-4">
          <h3 className="text-sm mt-9 font-medium text-gray-700">Selected Data Sources</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedSources.map((source) => (
              <span
                key={source}
                className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700"
              >
                {source}
                <button
                  type="button"
                  className="ml-2 text-indigo-500 hover:text-indigo-700"
                  onClick={() => handleRemove(source)}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}