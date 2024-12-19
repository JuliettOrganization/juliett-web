
'use client';
import React, { useState } from 'react';
import SubGroups from '@/app/ui/home_account/configuration/agencygrouping/SubGroups';
import AgencyGroups from '@/app/ui/home_account/configuration/agencygrouping/AgencyGroups';
import AgencyCodes from '@/app/ui/home_account/configuration/agencygrouping/AgencyCodes';
import AddGroupDialog from '@/app/ui/home_account/configuration/agencygrouping/AddGroupDialog';
import AddSubGroupDialog from '@/app/ui/home_account/configuration/agencygrouping/AddSubGroupDialog';
import DeleteConfirmationDialog from '@/app/ui/home_account/configuration/agencygrouping/DeleteConfirmationDialog';
import PopupNotification from '@/app/ui/PopupNotification';
import { initialAgencyCodes } from '@/app/api/configuration/accountGrouping/initialAgencyCode/route';
import { groups } from '@/app/api/configuration/accountGrouping/groups/route';
import { subGroups } from '@/app/api/configuration/accountGrouping/subGroups/route';
import '@/app/ui/global_public.module.css';
import { initialAgencyCodesWithAssignments } from '@/app/api/configuration/accountGrouping/initialAgencyCodesWithAssignments/route';

export default function AgencyGroupingPage() {
  const [agencyGroups, setAgencyGroups] = useState(groups);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [subGroupsState, setSubGroupsState] = useState<{ [key: string]: string[] }>(subGroups);
  const [selectedSubGroup, setSelectedSubGroup] = useState<string | null>(null);
  const [agencyCodes, setAgencyCodes] = useState<{ [key: string]: { [key: string]: string } }>(initialAgencyCodesWithAssignments);
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

  // <div className="w-full">
  // <div className="flex w-full items-center justify-between">
  //   <h1 className='mb-4 text-xl md:text-4xl'>Report List</h1>
  // </div>

  return (
    <div className="w-full"> 
    <div className="w-full p-8 justify-between">
      <PopupNotification message={popupMessage} />
      <div>
          <h1 className="mb-4 text-4xl">Agency Grouping</h1>
        </div>
      <div className="flex flex-row space-x-4 mb-4 items-center justify-end">
      
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
        <AgencyGroups
          agencyGroups={agencyGroups}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          setSelectedSubGroup={setSelectedSubGroup}
          setDeleteItem={setDeleteItem}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          setIsGroupDialogOpen={setIsGroupDialogOpen}
        />

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
        </div>
        </div>
  );
}