import React from 'react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';

interface AgencyGroupsProps {
  agencyGroups: string[];
  selectedGroup: string | null;
  setSelectedGroup: (group: string | null) => void;
  setSelectedSubGroup: (subGroup: string | null) => void;
  setDeleteItem: (item: { type: 'group' | 'subgroup'; name: string }) => void;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
  setIsGroupDialogOpen: (isOpen: boolean) => void;
}

const AgencyGroups: React.FC<AgencyGroupsProps> = ({
  agencyGroups,
  selectedGroup,
  setSelectedGroup,
  setSelectedSubGroup,
  setDeleteItem,
  setIsDeleteDialogOpen,
  setIsGroupDialogOpen,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex-1">
      <h2 className="text-2xl font-semibold mb-4">Agency Groups</h2>
      <ul className="space-y-2">
        {agencyGroups.map((group) => (
          <li
            key={group}
            className={`p-2 rounded cursor-pointer flex items-center justify-between ${
              selectedGroup === group ? 'bg-gray-600 text-white' : 'bg-gray-100'
            }`}
            onClick={() => {
              setSelectedGroup(group);
              setSelectedSubGroup(null);
            }}
          >
            {group}
            <button
              className="ml-2 flex items-center text-center justify-center w-4 h-4 p-0"
              onClick={(e) => {
                e.stopPropagation();
                setDeleteItem({ type: 'group', name: group });
                setIsDeleteDialogOpen(true);
              }}
            >
              <XMarkIcon className="h-4 w-4 items-center rounded-full  text-white bg-black text-center p-0.5 hover:bg-gray-500"/>
            </button>
          </li>
        ))}
      </ul>
      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded flex items-center justify-center md:w-auto w-10"
        onClick={() => setIsGroupDialogOpen(true)}
      >
        <span className="hidden md:inline">Add Group</span>{' '}
        <PlusIcon className="h-5 md:ml-4"/>
      </button>
    </div>
  );
};

export default AgencyGroups;