import React from 'react';

const RadioButtonListItinerary: React.FC = () => {
  return (
    <div className="relative justify-start">
      <fieldset>
        <div className="mt-2 space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="ticket-based"
              name="option"
              value="Grouping 1"
              className="peer cursor-pointer text-purple-600"
              defaultChecked
            />
            <label htmlFor="ticket-based" className="ml-2 text-sm cursor-pointer">
              Ticket based
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="coupon-based"
              name="option"
              value="Grouping 2"
              className="peer cursor-pointer text-purple-600"
            />
            <label htmlFor="coupon-based" className="ml-2 text-sm cursor-pointer">
              Coupon based
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="stopover-based"
              name="option"
              value="Grouping 3"
              className="peer cursor-pointer text-purple-600"
            />
            <label htmlFor="stopover-based" className="ml-2 text-sm cursor-pointer">
              Stopover based
            </label>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default RadioButtonListItinerary;
