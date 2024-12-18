import React from 'react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';

interface SubGroupsProps {
  selectedGroup: string | null;
  subGroups: { [key: string]: string[] };
  selectedSubGroup: string | null;
  setSelectedSubGroup: (subGroup: string | null) => void;
  setDeleteItem: (item: { type: 'group' | 'subgroup'; name: string }) => void;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
  setIsSubGroupDialogOpen: (isOpen: boolean) => void;
}

const SubGroups: React.FC<SubGroupsProps> = ({
  selectedGroup,
  subGroups,
  selectedSubGroup,
  setSelectedSubGroup,
  setDeleteItem,
  setIsDeleteDialogOpen,
  setIsSubGroupDialogOpen,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex-1">
      <h2 className="text-2xl font-semibold mb-4">Subgroups</h2>
      <ul className="space-y-2">
        {selectedGroup &&
          subGroups[selectedGroup].map((subGroup) => (
            <li
              key={subGroup}
              className={`p-2 rounded cursor-pointer items-center flex justify-between ${
                selectedSubGroup === subGroup ? 'bg-gray-600 text-white' : 'bg-gray-100'
              }`}
              onClick={() => setSelectedSubGroup(subGroup)}
            >
              {subGroup}
              <button
                className="ml-2 flex items-center text-center justify-center w-4 h-4 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteItem({ type: 'subgroup', name: subGroup });
                  setIsDeleteDialogOpen(true);
                }}
              >
                <XMarkIcon className="h-4 w-4 items-center rounded-full  text-white bg-black text-center p-0.5 hover:bg-gray-500" />
              </button>
            </li>
          ))}
        {selectedGroup && (
          <li
            className={`p-2 rounded cursor-pointer flex justify-between ${
              selectedSubGroup === 'Not Allocated' ? 'bg-gray-600 text-white' : 'bg-gray-100'
            }`}
            onClick={() => setSelectedSubGroup('Not Allocated')}
          >
            Not Allocated
          </li>
        )}
      </ul>
      {selectedGroup && selectedGroup !== 'Not Allocated' && (
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded flex items-center justify-center md:w-auto w-10"
          onClick={() => setIsSubGroupDialogOpen(true)}
        >
          <span className="hidden md:inline">Add Subgroup</span>{' '}
          <PlusIcon className="h-5 md:ml-4"/>
        </button>
      )}
    </div>
  );
};

export default SubGroups;