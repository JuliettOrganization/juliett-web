"use client";
import React, { useState, useEffect } from "react";
import SubGroups from "@/app/home_account/configuration/geogrouping/ui/SubGroups";
import GeoGroups from "@/app/home_account/configuration/geogrouping/ui/GeoGroups";
import GeoCodes from "@/app/home_account/configuration/geogrouping/ui/GeoCodes";
import AddGroupDialog from "@/app/home_account/configuration/geogrouping/ui/AddGroupDialog";
import AddSubGroupDialog from "@/app/home_account/configuration/geogrouping/ui/AddSubGroupDialog";
import DeleteConfirmationDialog from "@/app/home_account/configuration/geogrouping/ui/DeleteConfirmationDialog";
import PopupNotification from "@/app/ui_general/PopupNotification";
import "@/app/ui_general/global_public.module.css";
import { useRouter } from "next/navigation";

const LoadingSpinner = () => (
  <div className="w-full flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-6 border-b-6 border-black"></div>
  </div>
);
export default function GeoGroupingPage() {
  const [geoGroups, setGeoGroups] = useState<string[]>([]);
  const [subGroupsState, setSubGroupsState] = useState<{
    [key: string]: string[];
  }>({});
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedSubGroup, setSelectedSubGroup] = useState<string | null>(null);
  const [geoCodes, setGeoCodes] = useState<{
    [key: string]: { [key: string]: string };
  }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false);
  const [isSubGroupDialogOpen, setIsSubGroupDialogOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newSubGroupName, setNewSubGroupName] = useState("");
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<{
    type: "group" | "subgroup";
    name: string;
  } | null>(null);
  const [initialGeoCodes, setinitialGeoCodes] = useState<{
    [key: string]: string;
  }>({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    // Fetch groups from the API
    fetch("/api/configuration/geoGrouping/groups")
      .then((response) => response.json())
      .then((data) => setGeoGroups(data))
      .catch((error) => console.error("Error fetching groups:", error))
      .finally(() => setLoading(false));

    // Fetch subGroups from the API
    fetch("/api/configuration/geoGrouping/subGroups")
      .then((response) => response.json())
      .then((data) => setSubGroupsState(data))
      .catch((error) => console.error("Error fetching subGroups:", error))
      .finally(() => setLoading(false));

    // Fetch initialGeoCodesWithAssignments from the API
    fetch("/api/configuration/geoGrouping/initialGeoCodesWithAssignments")
      .then((response) => response.json())
      .then((data) => setGeoCodes(data))
      .catch((error) =>
        console.error("Error fetching initialGeoCodesWithAssignments:", error),
      )
      .finally(() => setLoading(false));

    // Fetch initialGeoCodes from the API
    fetch("/api/configuration/geoGrouping/initialGeoCodes")
      .then((response) => response.json())
      .then((data) => setinitialGeoCodes(data))
      .catch((error) => console.error("Error fetching initialGeoCodes:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleAddGroup = () => {
    if (newGroupName) {
      setGeoGroups([...geoGroups, newGroupName]);
      setSubGroupsState({ ...subGroupsState, [newGroupName]: [] });
      setGeoCodes({
        ...geoCodes,
        [newGroupName]: { ...initialGeoCodes },
      });
      setNewGroupName("");
      setIsGroupDialogOpen(false);
      setPopupMessage("Group added successfully!");
      setTimeout(() => setPopupMessage(null), 3000);
    }
  };

  const handleDeleteGroup = (group: string) => {
    setGeoGroups(geoGroups.filter((g) => g !== group));
    const newSubGroups = { ...subGroupsState };
    delete newSubGroups[group];
    setSubGroupsState(newSubGroups);
    const newGeoCodes = { ...geoCodes };
    delete newGeoCodes[group];
    setGeoCodes(newGeoCodes);
    setSelectedGroup(null);
    setPopupMessage("Group deleted successfully!");
    setTimeout(() => setPopupMessage(null), 3000);
  };

  const handleAddSubGroup = () => {
    if (!selectedGroup || !newSubGroupName) return;
    setSubGroupsState({
      ...subGroupsState,
      [selectedGroup]: [...subGroupsState[selectedGroup], newSubGroupName],
    });
    setNewSubGroupName("");
    setIsSubGroupDialogOpen(false);
    setPopupMessage("Subgroup added successfully!");
    setTimeout(() => setPopupMessage(null), 3000);
  };

  const handleDeleteSubGroup = (subGroup: string) => {
    if (!selectedGroup) return;
    // Reallocate geo codes to "Not Allocated" before deleting the subgroup
    const updatedGeoCodes = { ...geoCodes[selectedGroup] };
    Object.keys(updatedGeoCodes).forEach((code) => {
      if (updatedGeoCodes[code] === subGroup) {
        updatedGeoCodes[code] = "Not Allocated";
      }
    });
    setGeoCodes({
      ...geoCodes,
      [selectedGroup]: updatedGeoCodes,
    });
    setSubGroupsState({
      ...subGroupsState,
      [selectedGroup]: subGroupsState[selectedGroup].filter(
        (sg) => sg !== subGroup,
      ),
    });
    setSelectedSubGroup(null);
    setPopupMessage("Subgroup deleted successfully!");
    setTimeout(() => setPopupMessage(null), 3000);
  };

  const handleGeoCodeChange = (code: string, subGroup: string) => {
    setGeoCodes({
      ...geoCodes,
      [selectedGroup!]: { ...geoCodes[selectedGroup!], [code]: subGroup },
    });
  };

  const handleSave = () => {
    setPopupMessage("Changes saved successfully!");
    setTimeout(() => setPopupMessage(null), 3000);
    router.push("/home_account/configuration");
  };

  const handleCancel = () => {
    // Reset state to initial values (for simplicity, not implemented here)
    setPopupMessage("Changes canceled!");
    setTimeout(() => setPopupMessage(null), 3000);
    router.push("/home_account/configuration");
  };

  const filteredGeoCodes = selectedGroup
    ? Object.keys(geoCodes[selectedGroup] || {}).filter((code) =>
        code.includes(searchQuery),
      )
    : [];

  const getNotAllocatedCodes = () => {
    if (!selectedGroup) return [];
    return Object.keys(geoCodes[selectedGroup] || {}).filter(
      (code) => geoCodes[selectedGroup][code] === "Not Allocated",
    );
  };

  const uniqueNotAllocatedCodes = Array.from(new Set(getNotAllocatedCodes()));

  const confirmDelete = () => {
    if (deleteItem) {
      if (deleteItem.type === "group") {
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
          <h1 className="mb-4 text-4xl">Geo Grouping</h1>
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
          {/* Geo Groups */}
          <GeoGroups
            geoGroups={geoGroups}
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

          {/* Geo Codes */}
          <GeoCodes
            selectedGroup={selectedGroup}
            selectedSubGroup={selectedSubGroup}
            geoCodes={geoCodes}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleGeoCodeChange={handleGeoCodeChange}
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
