import React from "react";

const airlines = [
  { value: "air-france", label: "Air France" },
  { value: "british-airways", label: "British Airways" },
  { value: "lufthansa", label: "Lufthansa" },
  { value: "emirates", label: "Emirates" },
  { value: "qatar-airways", label: "Qatar Airways" },
  { value: "singapore-airlines", label: "Singapore Airlines" },
  { value: "delta", label: "Delta" },
  { value: "united", label: "United" },
  { value: "swiss-air", label: "Swiss Air" },
];

const ClassMappingSelection: React.FC = () => {
  return (
    <div className="w-full h-full z-30">
      <div className="rounded-md w-full h-full">
        <div className="flex flex-col shadow border border-gray-200 rounded-md bg-white pt-4 pr-4 pl-6 pb-1 space-y-6 w-full h-full">
          {/* Select Airline */}
          <div className="mb-4">
            <label
              htmlFor="select_airline"
              className="mb-2 block text-sm font-medium"
            >
              Select Airline
            </label>
            <div className="relative mt-2 rounded-md">
              <select
                id="select_airline"
                name="select_airline"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
              >
                <option value="" disabled>
                  Select an airline
                </option>
                {airlines.map((airline) => (
                  <option key={airline.value} value={airline.value}>
                    {airline.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassMappingSelection;
