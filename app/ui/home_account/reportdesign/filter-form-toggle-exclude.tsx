import React from 'react';

const ToggleSwitchItinerary: React.FC = () => {
  return (
    <div className="relative justify-start">
      <fieldset>
        <div className="mt-2 space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="exclude"
              name="exclude"
              className="peer hidden"
              defaultChecked
            />
            <label
              htmlFor="exclude"
              className="relative inline-block w-12 h-6 bg-gray-300 rounded-full cursor-pointer transition-colors duration-200 ease-in-out peer-checked:bg-green-500"
            >
              <span
                className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full border border-gray-300 transition-transform duration-200 ease-in-out peer-checked:translate-x-6"
              ></span>
            </label>
            <span className="ml-2 text-sm cursor-pointer">Exclude</span>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default ToggleSwitchItinerary;
