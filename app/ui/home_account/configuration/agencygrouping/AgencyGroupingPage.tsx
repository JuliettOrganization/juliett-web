
'use client';
import React, { useState } from 'react';
import SubGroups from '@/app/ui/home_account/configuration/agencygrouping/SubGroups';
import AgencyCodes from '@/app/ui/home_account/configuration/agencygrouping/AgencyCodes';
import AddGroupDialog from '@/app/ui/home_account/configuration/agencygrouping/AddGroupDialog';
import AddSubGroupDialog from '@/app/ui/home_account/configuration/agencygrouping/AddSubGroupDialog';
import DeleteConfirmationDialog from '@/app/ui/home_account/configuration/agencygrouping/DeleteConfirmationDialog';
import PopupNotification from '@/app/ui/home_account/configuration/agencygrouping/PopupNotification';
import { initialAgencyCodes } from '@/app/api/configuration/accountGrouping/initialAgencyCode/route';
import { groups } from '@/app/api/configuration/accountGrouping/groups/route';
import { subGroups } from '@/app/api/configuration/accountGrouping/subGroups/route';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function AgencyGroupingPage() {
  const [agencyGroups, setAgencyGroups] = useState(groups);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [subGroupsState, setSubGroupsState] = useState<{ [key: string]: string[] }>(subGroups);
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
      setSubGroupsState({ ...subGroupsState, [newGroupName]: [] });
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
    const newSubGroups = { ...subGroupsState };
    delete newSubGroups[group];
    setSubGroupsState(newSubGroups);
    const newAgencyCodes = { ...agencyCodes };
    delete newAgencyCodes[group];
    setAgencyCodes(newAgencyCodes);
    setSelectedGroup(null);
    setPopupMessage('Group deleted successfully!');
    setTimeout(() => setPopupMessage(null), 3000);
  };

  const handleAddSubGroup = () => {
    if (!selectedGroup || !newSubGroupName) return;
    setSubGroupsState({
      ...subGroupsState,
      [selectedGroup]: [...subGroupsState[selectedGroup], newSubGroupName],
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
    setSubGroupsState({
      ...subGroupsState,
      [selectedGroup]: subGroupsState[selectedGroup].filter((sg) => sg !== subGroup),
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
    ? Object.keys(agencyCodes[selectedGroup] || {}).filter((code) =>
        code.includes(searchQuery)
      )
    : [];

  const getNotAllocatedCodes = () => {
    if (!selectedGroup) return [];
    return Object.keys(agencyCodes[selectedGroup] || {}).filter(
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
      <PopupNotification message={popupMessage} />
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
            <span className="hidden md:inline">Add Group</span>
            <span className="md:hidden">+</span>
          </button>
        </div>

        {/* Subgroups */}
        <SubGroups
          selectedGroup={selectedGroup}
          subGroups={subGroupsState}
          selectedSubGroup={selectedSubGroup}
          setSelectedSubGroup={setSelectedSubGroup}
          setDeleteItem={setDeleteItem}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          setIsSubGroupDialogOpen={setIsSubGroupDialogOpen}
        />

        {/* Agency Codes */}
        <AgencyCodes
          selectedGroup={selectedGroup}
          selectedSubGroup={selectedSubGroup}
          agencyCodes={agencyCodes}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleAgencyCodeChange={handleAgencyCodeChange}
        />
      </div>

      <AddGroupDialog
        isOpen={isGroupDialogOpen}
        setIsOpen={setIsGroupDialogOpen}
        newGroupName={newGroupName}
        setNewGroupName={setNewGroupName}
        handleAddGroup={handleAddGroup}
      />

      <AddSubGroupDialog
        isOpen={isSubGroupDialogOpen}
        setIsOpen={setIsSubGroupDialogOpen}
        newSubGroupName={newSubGroupName}
        setNewSubGroupName={setNewSubGroupName}
        handleAddSubGroup={handleAddSubGroup}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        confirmDelete={confirmDelete}
      />
    </main>
  );
}