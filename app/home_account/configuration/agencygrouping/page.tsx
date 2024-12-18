'use client';
import React, { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Transition } from '@headlessui/react';

export default function Page() {
  const initialAgencyCodes = {
    '1234567': 'Not Allocated',
    '2345678': 'Not Allocated',
    '3456789': 'Not Allocated',
    '4567890': 'Not Allocated',
    '5678901': 'Not Allocated',
    '6789012': 'Not Allocated',
    '7890123': 'Not Allocated',
    '8901234': 'Not Allocated',
    '9012345': 'Not Allocated',
    '0123456': 'Not Allocated',
    '1123456': 'Not Allocated',
    '2123456': 'Not Allocated',
  };

  const [agencyGroups, setAgencyGroups] = useState(['Group 1', 'Group 2', 'Group 3']);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [subGroups, setSubGroups] = useState<{ [key: string]: string[] }>({
    'Group 1': [],
    'Group 2': [],
    'Group 3': [],
  });
  const [selectedSubGroup, setSelectedSubGroup] = useState<string | null>(null);
  const [agencyCodes, setAgencyCodes] = useState<{ [key: string]: { [key: string]: string } }>({
    'Group 1': { ...initialAgencyCodes },
    'Group 2': { ...initialAgencyCodes },
    'Group 3': { ...initialAgencyCodes },
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false);
  const [isSubGroupDialogOpen, setIsSubGroupDialogOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newSubGroupName, setNewSubGroupName] = useState('');
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<{ type: 'group' | 'subgroup'; name: string } | null>(null);

  const handleAddGroup = () => {
    if (newGroupName) {
      setAgencyGroups([...agencyGroups, newGroupName]);
      setSubGroups({ ...subGroups, [newGroupName]: [] });
      setAgencyCodes({
        ...agencyCodes,
        [newGroupName]: { ...initialAgencyCodes },
      });
      setNewGroupName('');
      setIsGroupDialogOpen(false);
      setPopupMessage('Group added successfully!');
      setTimeout(() => setPopupMessage(null), 3000);
    }
  };

  const handleDeleteGroup = (group: string) => {
    setAgencyGroups(agencyGroups.filter((g) => g !== group));
    const newSubGroups = { ...subGroups };
    delete newSubGroups[group];
    setSubGroups(newSubGroups);
    const newAgencyCodes = { ...agencyCodes };
    delete newAgencyCodes[group];
    setAgencyCodes(newAgencyCodes);
    setSelectedGroup(null);
    setPopupMessage('Group deleted successfully!');
    setTimeout(() => setPopupMessage(null), 3000);
  };

  const handleAddSubGroup = () => {
    if (!selectedGroup || !newSubGroupName) return;
    setSubGroups({
      ...subGroups,
      [selectedGroup]: [...subGroups[selectedGroup], newSubGroupName],
    });
    setNewSubGroupName('');
    setIsSubGroupDialogOpen(false);
    setPopupMessage('Subgroup added successfully!');
    setTimeout(() => setPopupMessage(null), 3000);
  };

  const handleDeleteSubGroup = (subGroup: string) => {
    if (!selectedGroup) return;
    // Reallocate agency codes to "Not Allocated" before deleting the subgroup
    const updatedAgencyCodes = { ...agencyCodes[selectedGroup] };
    Object.keys(updatedAgencyCodes).forEach((code) => {
      if (updatedAgencyCodes[code] === subGroup) {
        updatedAgencyCodes[code] = 'Not Allocated';
      }
    });
    setAgencyCodes({
      ...agencyCodes,
      [selectedGroup]: updatedAgencyCodes,
    });
    setSubGroups({
      ...subGroups,
      [selectedGroup]: subGroups[selectedGroup].filter((sg) => sg !== subGroup),
    });
    setSelectedSubGroup(null);
    setPopupMessage('Subgroup deleted successfully!');
    setTimeout(() => setPopupMessage(null), 3000);
  };

  const handleAgencyCodeChange = (code: string, subGroup: string) => {
    setAgencyCodes({
      ...agencyCodes,
      [selectedGroup!]: { ...agencyCodes[selectedGroup!], [code]: subGroup },
    });
  };

  const handleSave = () => {
    setPopupMessage('Changes saved successfully!');
    setTimeout(() => setPopupMessage(null), 3000);
  };

  const handleCancel = () => {
    // Reset state to initial values (for simplicity, not implemented here)
    setPopupMessage('Changes canceled!');
    setTimeout(() => setPopupMessage(null), 3000);
  };

  const filteredAgencyCodes = selectedGroup
    ? Object.keys(agencyCodes[selectedGroup]).filter((code) =>
        code.includes(searchQuery)
      )
    : [];

  const getNotAllocatedCodes = () => {
    if (!selectedGroup) return [];
    return Object.keys(agencyCodes[selectedGroup]).filter(
      (code) => agencyCodes[selectedGroup][code] === 'Not Allocated'
    );
  };

  const uniqueNotAllocatedCodes = Array.from(new Set(getNotAllocatedCodes()));

  const confirmDelete = () => {
    if (deleteItem) {
      if (deleteItem.type === 'group') {
        handleDeleteGroup(deleteItem.name);
      } else {
        handleDeleteSubGroup(deleteItem.name);
      }
      setDeleteItem(null);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <main className="p-10 w-[80vw]">
      <Transition
        show={!!popupMessage}
        enter="transform transition duration-300"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition duration-300"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="fixed top-24 right-4 border-l-8 border-l-green-500 bg-white text-green-500 px-4 py-2 rounded shadow-lg">
          {popupMessage}
        </div>
      </Transition>
      <div className="flex flex-row space-x-4 mb-4 items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-8">AGENCY GROUPING</h1>
        </div>
        <div className="flex flex-row space-x-4">
          <button
            className="flex h-10 w-36 bg-black text-white items-center justify-center rounded-full"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="flex h-10 w-36 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 w-full">
        {/* Agency Groups */}
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
                  className="ml-2 text-white bg-black rounded-full flex items-center justify-center w-5 h-5 p-1 hover:bg-gray-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteItem({ type: 'group', name: group });
                    setIsDeleteDialogOpen(true);
                  }}
                >
                  <XMarkIcon className="h-4 w-4" />
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

        {/* Subgroups */}
        <div className="bg-white p-4 rounded-lg shadow-md flex-1">
          <h2 className="text-2xl font-semibold mb-4">Subgroups</h2>
          <ul className="space-y-2">
            {selectedGroup &&
              subGroups[selectedGroup].map((subGroup) => (
                <li
                  key={subGroup}
                  className={`p-2 rounded cursor-pointer flex justify-between ${
                    selectedSubGroup === subGroup ? 'bg-gray-600 text-white' : 'bg-gray-100'
                  }`}
                  onClick={() => setSelectedSubGroup(subGroup)}
                >
                  {subGroup}
                  <button
                    className="ml-2 text-white bg-black rounded-full flex items-center justify-center w-5 h-5 p-1 hover:bg-gray-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteItem({ type: 'subgroup', name: subGroup });
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <XMarkIcon className="h-4 w-4" />
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

        {/* Agency Codes */}
        {selectedSubGroup && selectedSubGroup !== 'Not Allocated' && (
          <div className="bg-white p-4 rounded-lg shadow-md flex-1">
            <h2 className="text-2xl font-semibold mb-4">Agency Codes</h2>
            <input
              type="text"
              placeholder="Search agency codes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded-full w-full"
            />
            <ul className="space-y-2">
              {filteredAgencyCodes.map((code) => {
                const isAllocatedToOtherSubGroup =
                  selectedGroup &&
                  selectedSubGroup &&
                  agencyCodes[selectedGroup][code] !== 'Not Allocated' &&
                  agencyCodes[selectedGroup][code] !== selectedSubGroup;

                return (
                  <li
                    key={code}
                    className={`p-2 rounded ${
                      isAllocatedToOtherSubGroup ? 'bg-gray-300' : 'bg-gray-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={
                        selectedGroup !== null &&
                        agencyCodes[selectedGroup][code] === selectedSubGroup
                      }
                      onChange={() =>
                        handleAgencyCodeChange(
                          code,
                          selectedGroup &&
                            agencyCodes[selectedGroup][code] === selectedSubGroup
                            ? 'Not Allocated'
                            : selectedSubGroup || 'Not Allocated'
                        )
                      }
                      disabled={selectedSubGroup === 'Not Allocated'}
                    />
                    {code}
                    {isAllocatedToOtherSubGroup && (
                      <span className="ml-2 text-sm text-gray-500">
                        ({agencyCodes[selectedGroup][code]})
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {selectedSubGroup === 'Not Allocated' && (
          <div className="bg-white p-4 rounded-lg shadow-md flex-1">
            <h2 className="text-2xl font-semibold mb-4">Not Allocated Agency Codes</h2>
            <input
              type="text"
              placeholder="Search agency codes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4 p-2 border rounded w-full"
            />
            <ul className="space-y-2">
              {uniqueNotAllocatedCodes.map((code) => (
                <li key={code} className="p-2 rounded bg-gray-100">
                  {code}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Add Group Dialog */}
      {isGroupDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-6 z-10 w-96">
            <h2 className="text-xl font-semibold mb-4">Add Group</h2>
            <p className="mb-4">Enter the name of the new group.</p>
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="mt-2 p-2 border rounded w-full"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-100 text-gray-600 py-2 px-4 rounded"
                onClick={() => setIsGroupDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleAddGroup}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Subgroup Dialog */}
      {isSubGroupDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-6 z-10 w-96">
            <h2 className="text-xl font-semibold mb-4">Add Subgroup</h2>
            <p className="mb-4">Enter the name of the new subgroup.</p>
            <input
              type="text"
              value={newSubGroupName}
              onChange={(e) => setNewSubGroupName(e.target.value)}
              className="mt-2 p-2 border rounded w-full"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-100 text-gray-600 py-2 px-4 rounded"
                onClick={() => setIsSubGroupDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleAddSubGroup}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-6 z-10 w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete this item?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-100 text-gray-600 py-2 px-4 rounded"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}