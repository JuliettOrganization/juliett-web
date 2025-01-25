import React from 'react';

interface KPIBoxProps {
  title: string;
  value: string;
  yoy: string;
}

const KPIBox: React.FC<KPIBoxProps> = ({ title, value, yoy }) => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-2xl">{value}</p>
    <p className={`inline-block px-1 rounded-lg ${parseFloat(yoy) < 0 ? 'bg-red-500' : 'bg-green-500'} text-white`}>{yoy}</p>
    </div>
  );
};

export default KPIBox;