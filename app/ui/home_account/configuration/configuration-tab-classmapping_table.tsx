import React, { useState } from 'react';

const rbds = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
  'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

type SelectedClassType = { [key: string]: string };

const initialSelectedClass: SelectedClassType = rbds.reduce<SelectedClassType>((acc, rbd) => {
  acc[rbd] = 'Economy';
  return acc;
}, {});

const ClassMappingTable: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<SelectedClassType>(initialSelectedClass);

  const handleRadioChange = (rbd: string, selected: string) => {
    setSelectedClass({ ...selectedClass, [rbd]: selected });
  };

  const handleSave = () => {
    // Simulate save function (you can replace this with an actual save function)
    console.log('%cSelections have been saved!', 'color: white; background-color: purple; font-size: 16px; padding: 4px; border-radius: 4px;');
    console.log("Saved data:", selectedClass);
    alert("Selections have been saved!");
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-purple-200 p-2 h-[50vh] w-full">
      <div className="flex flex-row items-center rounded-md bg-purple-200 p-2 w-full space-x-8 justify-start">
        <button 
          className="mb-4 px-4 py-2 bg-gray-200 text-black rounded-full hover:bg-purple-600"
        >
          Cancel
        </button>
        <button 
          onClick={handleSave} 
          className="mb-4 px-4 py-2 bg-black text-white rounded-full hover:bg-purple-600"
        >
          Save
        </button>
      </div>
      <div className="rounded-md bg-white border w-full h-full p-4 overflow-hidden">
        <div className="overflow-auto h-full">
          <table className="min-w-full bg-white relative">
            <thead className="bg-purple-500 text-white sticky top-0 z-10">
              <tr>
                <th className="py-2 px-4 border-b w-[10%]">RBD</th>
                <th className="py-2 px-4 border-b w-[22.5%]">Economy</th>
                <th className="py-2 px-4 border-b w-[22.5%]">Premium Economy</th>
                <th className="py-2 px-4 border-b w-[22.5%]">Business</th>
                <th className="py-2 px-4 border-b w-[22.5%]">First</th>
              </tr>
            </thead>
            <tbody>
              {rbds.map((rbd) => (
                <tr key={rbd}>
                  <td className="py-2 px-4 border-b text-center w-[10%]">{rbd}</td>
                  {['Economy', 'Premium Economy', 'Business', 'First'].map((classType) => (
                    <td key={classType} className="py-2 px-4 border-b text-center w-[22.5%]">
                      <input
                        type="radio"
                        name={rbd}
                        value={classType}
                        checked={selectedClass[rbd] === classType}
                        onChange={() => handleRadioChange(rbd, classType)}
                        className="cursor-pointer text-purple-500"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClassMappingTable;
