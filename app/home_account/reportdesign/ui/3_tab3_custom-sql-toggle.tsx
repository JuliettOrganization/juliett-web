import React from "react";

interface ToggleSwitchCustomSqlProps {
  isCustomSqlActive: boolean;
  setIsCustomSqlActive: (value: boolean) => void;
}

const ToggleSwitchCustomSql: React.FC<ToggleSwitchCustomSqlProps> = ({
  isCustomSqlActive,
  setIsCustomSqlActive,
}) => {
  const handleToggle = () => {
    setIsCustomSqlActive(!isCustomSqlActive);
  };

  return (
    <div className="flex h-full bg-white space-x-6 peer-checked:bg-green-500">
      <label className="group w-80 p-6 h-15 bg-gray-200 relative rounded-full select-none cursor-pointer space-x-6 peer-checked:bg-green-500 flex dark:bg-gray-800">
        <input
          className="peer rounded-full h-6 w-12 bg-red-500 border-none cursor-pointer text-green-500 peer-checked:text-green-500"
          type="checkbox"
          hidden
          checked={isCustomSqlActive}
          onChange={handleToggle}
        />
        <div className="peer w-30 h-full bg-red-500 rounded-full transition-all shadow-md absolute group-hover:shadow-xl peer-checked:bg-green-500 peer-checked:ml-30"></div>
        <span className="transition relative w-30 h-full flex items-center justify-center font-bold text-white peer-checked:text-green-500">
          Activate
        </span>
        <span className="transition relative w-30 h-full flex items-center justify-center font-bold text-red-500 peer-checked:text-white">
          Deactivate
        </span>
      </label>
    </div>
  );
};

export default ToggleSwitchCustomSql;
