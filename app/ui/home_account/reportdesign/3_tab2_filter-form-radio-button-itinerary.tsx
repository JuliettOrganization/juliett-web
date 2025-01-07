import React from 'react';

interface RadioButtonListItineraryProps {
  ODconcept: string;
  setODconcept: (value: string) => void;
}

const RadioButtonListItinerary: React.FC<RadioButtonListItineraryProps> = ({
  ODconcept,
  setODconcept,
}) => {
  return (
    <div className="relative justify-start">
      <fieldset>
        <div className="mt-2 space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="ticket-based"
              name="option"
              value="Ticket based"
              className="peer cursor-pointer text-green-500"
              checked={ODconcept === 'Ticket based'}
              onChange={(e) => setODconcept(e.target.value)}
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
              value="Coupon based"
              className="peer cursor-pointer text-green-500"
              checked={ODconcept === 'Coupon based'}
              onChange={(e) => setODconcept(e.target.value)}
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
              value="Stopover based"
              className="peer cursor-pointer text-green-500"
              checked={ODconcept === 'Stopover based'}
              onChange={(e) => setODconcept(e.target.value)}
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