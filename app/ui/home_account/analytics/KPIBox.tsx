import React from 'react';

interface KPIBoxProps {
  title: string;
  value: string;
  yoy: string;
  selectedKPI: string;
}
interface KPIBoxProps {
  title: string;
  value: string;
  yoy: string;
  selectedKPI: string;
  onClick?: () => void;
}
const KPIBox: React.FC<KPIBoxProps> = ({ selectedKPI, title, value, yoy, onClick }) => {
  const getBackgroundColor = (selectedKPI: string) => {
    switch (selectedKPI) {
      case 'Gross Amount':
        return 'rgba(75, 192, 192, 0.2)';
      case 'Coupon Count':
        return 'rgba(153, 102, 255, 0.2)';
      case 'Ticket Count':
        return 'rgba(255, 159, 64, 0.2)';
      case 'Average Fare':
        return 'rgba(54, 162, 235, 0.2)';
    default:
        return 'white';
    }
  };

  return (
    <div className="bg-white rounded-lg cursor-pointer" onClick={onClick}>
    <div className="p-4 rounded-lg" style={{ backgroundColor: getBackgroundColor(selectedKPI) }}>
      <h2 className="text-sm text-gray-500">{title}</h2>
      <div className="flex flex-row items-center justify-between">
        <p className="text-3xl">{value}</p>
        <p className={`inline-block px-1.5 rounded-full ${parseFloat(yoy) < 0 ? 'bg-red-500' : 'bg-green-500'} text-white`}>{yoy}</p>
      </div>
    </div>
    </div>
  );
};

export default KPIBox;

