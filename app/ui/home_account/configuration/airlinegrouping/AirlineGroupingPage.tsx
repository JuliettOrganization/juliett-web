'use client';
import React, { useState, useEffect } from 'react';
import SubGroups from '@/app/ui/home_account/configuration/airlinegrouping/SubGroups';
import AirlineGroups from '@/app/ui/home_account/configuration/airlinegrouping/AirlineGroups';
import AirlineCodes from '@/app/ui/home_account/configuration/airlinegrouping/AirlineCodes';
import AddGroupDialog from '@/app/ui/home_account/configuration/airlinegrouping/AddGroupDialog';
import AddSubGroupDialog from '@/app/ui/home_account/configuration/airlinegrouping/AddSubGroupDialog';
import DeleteConfirmationDialog from '@/app/ui/home_account/configuration/airlinegrouping/DeleteConfirmationDialog';
import PopupNotification from '@/app/ui/PopupNotification';
import '@/app/ui/global_public.module.css';

const LoadingSpinner = () => (
  <div className="w-full flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-6 border-b-6 border-black"></div>
  </div>
);
export default function AirlineGroupingPage() {
  const [airlineGroups, setAirlineGroups] = useState<string[]>([]);
  const [subGroupsState, setSubGroupsState] = useState<{ [key: string]: string[] }>({});
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedSubGroup, setSelectedSubGroup] = useState<string | null>(null);
  const [airlineCodes, setAirlineCodes] = useState<{ [key: string]: { [key: string]: string } }>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false);
  const [isSubGroupDialogOpen, setIsSubGroupDialogOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newSubGroupName, setNewSubGroupName] = useState('');
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<{ type: 'group' | 'subgroup'; name: string } | null>(null);
  const [initialAirlineCodes, setinitialAirlineCodes] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch groups from the API
    fetch('/api/configuration/airlineGrouping/groups')
      .then((response) => response.json())
      .then((data) => setAirlineGroups(data))
      .catch((error) => console.error('Error fetching groups:', error))
      .finally(() => setLoading(false));

    // Fetch subGroups from the API
    fetch('/api/configuration/airlineGrouping/subGroups')
      .then((response) => response.json())
      .then((data) => setSubGroupsState(data))
      .catch((error) => console.error('Error fetching subGroups:', error))
      .finally(() => setLoading(false));

        // Fetch initialAirlineCodesWithAssignments from the API
        fetch('/api/configuration/airlineGrouping/initialAirlineCodesWithAssignments')
        .then((response) => response.json())
        .then((data) => setAirlineCodes(data))
        .catch((error) => console.error('Error fetching initialAirlineCodesWithAssignments:', error))
        .finally(() => setLoading(false));

      // Fetch initialAirlineCodes from the API
    fetch('/api/configuration/airlineGrouping/initialAirlineCodes')
    .then((response) => response.json())
    .then((data) => setinitialAirlineCodes(data))
    .catch((error) => console.error('Error fetching initialAirlineCodes:', error))
    .finally(() => setLoading(false));
}, []);

const handleAddGroup = () => {
  if (newGroupName) {
    setAirlineGroups([...airlineGroups, newGroupName]);
    setSubGroupsState({ ...subGroupsState, [newGroupName]: [] });
    setAirlineCodes({
      ...airlineCodes,
      [newGroupName]: { ...initialAirlineCodes },
    });
    setNewGroupName('');
    setIsGroupDialogOpen(false);
    setPopupMessage('Group added successfully!');
    setTimeout(() => setPopupMessage(null), 3000);
  }
};

  const handleDeleteGroup = (group: string) => {
    setAirlineGroups(airlineGroups.filter((g) => g !== group));
    const newSubGroups = { ...subGroupsState };
    delete newSubGroups[group];
    setSubGroupsState(newSubGroups);
    const newAirlineCodes = { ...airlineCodes };
    delete newAirlineCodes[group];
    setAirlineCodes(newAirlineCodes);
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
    // Reallocate airline codes to "Not Allocated" before deleting the subgroup
    const updatedAirlineCodes = { ...airlineCodes[selectedGroup] };
    Object.keys(updatedAirlineCodes).forEach((code) => {
      if (updatedAirlineCodes[code] === subGroup) {
        updatedAirlineCodes[code] = 'Not Allocated';
      }
    });
    setAirlineCodes({
      ...airlineCodes,
      [selectedGroup]: updatedAirlineCodes,
    });
    setSubGroupsState({
      ...subGroupsState,
      [selectedGroup]: subGroupsState[selectedGroup].filter((sg) => sg !== subGroup),
    });
    setSelectedSubGroup(null);
    setPopupMessage('Subgroup deleted successfully!');
    setTimeout(() => setPopupMessage(null), 3000);
  };

  const handleAirlineCodeChange = (code: string, subGroup: string) => {
    setAirlineCodes({
      ...airlineCodes,
      [selectedGroup!]: { ...airlineCodes[selectedGroup!], [code]: subGroup },
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

  const filteredAirlineCodes = selectedGroup
    ? Object.keys(airlineCodes[selectedGroup] || {}).filter((code) =>
        code.includes(searchQuery)
      )
    : [];

  const getNotAllocatedCodes = () => {
    if (!selectedGroup) return [];
    return Object.keys(airlineCodes[selectedGroup] || {}).filter(
      (code) => airlineCodes[selectedGroup][code] === 'Not Allocated'
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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full"> 
    <div className="w-full p-8 justify-between">
      <PopupNotification message={popupMessage} />
      <div>
          <h1 className="mb-4 text-4xl">Airline Grouping</h1>
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
        {/* Airline Groups */}
        <AirlineGroups
          airlineGroups={airlineGroups}
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

        {/* Airline Codes */}
        <AirlineCodes
          selectedGroup={selectedGroup}
          selectedSubGroup={selectedSubGroup}
          airlineCodes={airlineCodes}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleAirlineCodeChange={handleAirlineCodeChange}
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