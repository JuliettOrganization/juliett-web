'use client';

import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { Combobox } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { ComboboxInput } from '@headlessui/react';
import {ComboboxButton} from '@headlessui/react';
import { ComboboxOptions } from '@headlessui/react';
import { ComboboxOption } from '@headlessui/react';


const currencies = [
  'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD',
  'MXN', 'SGD', 'HKD', 'NOK', 'KRW', 'TRY', 'RUB', 'INR', 'BRL', 'ZAR',
  'DKK', 'PLN', 'TWD', 'THB', 'MYR'
];

export default function MainInformationForm() {
  const [billing, setBilling] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
  const [query, setQuery] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const filteredCurrencies =
    query === ''
      ? currencies
      : currencies.filter((currency) =>
          currency.toLowerCase().includes(query.toLowerCase())
        );

  const handleSelect = (currencies: string[]) => {
    setSelectedCurrencies(currencies);
  };

  const handleRemove = (currency: string) => {
    setSelectedCurrencies(selectedCurrencies.filter((c) => c !== currency));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-purple-500 w-[45vw]">
      <h2 className="text-2xl font-bold mb-4">Main Information</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Account Name</label>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div className="flex items-center">
          <label className="block text-sm font-medium text-gray-700 mr-4">Billing</label>
          <Switch
            checked={billing}
            onChange={setBilling}
            className={`${billing ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable billing</span>
            <span
              className={`${billing ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
        <div className="flex flex-row items-start space-x-4">
        <div>
          <label className="block w-24 text-sm font-medium text-gray-700">Currencies</label>
          <Combobox value={selectedCurrencies} onChange={handleSelect} multiple>
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
                {filteredCurrencies.map((currency) => (
                  <ComboboxOption
                    key={currency}
                    value={currency}
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
                          {currency}
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
          
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedCurrencies.map((currency) => (
              <span
                key={currency}
                className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700"
              >
                {currency}
                <button
                  type="button"
                  className="ml-2 text-indigo-500 hover:text-indigo-700"
                  onClick={() => handleRemove(currency)}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
        </div>
       
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          {preview && (
            <div className="mt-4">
              <img src={preview} alt="Preview" className="max-w-full h-auto rounded-md shadow-md" />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}