import React, { useState } from 'react';
import Select, { SingleValue } from 'react-select';

const airlines = [
  { value: 'air-france', label: 'Air France' },
  { value: 'british-airways', label: 'British Airways' },
  { value: 'lufthansa', label: 'Lufthansa' },
  { value: 'emirates', label: 'Emirates' },
  { value: 'qatar-airways', label: 'Qatar Airways' },
  { value: 'singapore-airlines', label: 'Singapore Airlines' },
  { value: 'delta', label: 'Delta' },
  { value: 'united', label: 'United' },
  { value: 'swiss-air', label: 'Swiss Air' },
];

const ClassMappingSelection: React.FC = () => {
  const [selectedAirline, setSelectedAirline] = useState<SingleValue<{ value: string; label: string }>>(null);

  const handleChange = (selectedOption: SingleValue<{ value: string; label: string }>) => {
    setSelectedAirline(selectedOption);
  };

  return (
      <form className="w-full h-full z-30">
        <div className="rounded-md bg-purple-200 border w-full h-full p-2">
          <div className="flex flex-col border-none rounded-md bg-white pt-4 pr-4 pl-6 pb-1 space-y-6 w-full h-full">
            {/* Select Airline */}
            <div className="mb-4">
              <label htmlFor="select_airline" className="mb-2 block text-sm font-medium">
                Select Airline
              </label>
              <div className="relative mt-2 rounded-md">
                <Select
                  id="select_airline"
                  name="select_airline"
                  options={airlines}
                  value={selectedAirline}
                  onChange={handleChange}
                  className="peer block w-full cursor-pointer rounded-md border-none border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
                  placeholder="Type to search"
                />
              </div>
            </div>
          </div>
        </div>
      </form>

  );
};

export default ClassMappingSelection;
