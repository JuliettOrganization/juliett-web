'use client';
import React, { useState } from 'react';

export default function Page() {
  const [agencyGroups, setAgencyGroups] = useState(['Group 1', 'Group 2', 'Group 3']);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [subGroups, setSubGroups] = useState<{ [key: string]: string[] }>({
    'Group 1': ['Subgroup 1.1', 'Subgroup 1.2'],
    'Group 2': ['Subgroup 2.1', 'Subgroup 2.2'],
    'Group 3': ['Subgroup 3.1', 'Subgroup 3.2'],
  });
  const [selectedSubGroup, setSelectedSubGroup] = useState<string | null>(null);
  const [agencyCodes, setAgencyCodes] = useState<{ [key: string]: string[] }>({
    'Subgroup 1.1': ['1234567', '2345678', '3456789', '4567890', '5678901'],
    'Subgroup 1.2': ['1234567', '2345678', '3456789', '4567890', '5678901'],
    'Subgroup 2.1': ['1234567', '2345678', '3456789', '4567890', '5678901'],
    'Subgroup 2.2': ['1234567', '2345678', '3456789', '4567890', '5678901'],
    'Subgroup 3.1': ['1234567', '2345678', '3456789', '4567890', '5678901'],
    'Subgroup 3.2': ['1234567', '2345678', '3456789', '4567890', '5678901'],
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddGroup = () => {
    const newGroup = prompt('Enter new group name:');
    if (newGroup) {
      setAgencyGroups([...agencyGroups, newGroup]);
      setSubGroups({ ...subGroups, [newGroup]: [] });
    }
  };

  const handleDeleteGroup = (group: string) => {
    setAgencyGroups(agencyGroups.filter((g) => g !== group));
    const newSubGroups = { ...subGroups };
    delete newSubGroups[group];
    setSubGroups(newSubGroups);
    setSelectedGroup(null);
  };

  const handleAddSubGroup = () => {
    if (!selectedGroup) return;
    const newSubGroup = prompt('Enter new subgroup name:');
    if (newSubGroup) {
      setSubGroups({
        ...subGroups,
        [selectedGroup]: [...subGroups[selectedGroup], newSubGroup],
      });
      setAgencyCodes({ ...agencyCodes, [newSubGroup]: [] });
    }
  };

  const handleDeleteSubGroup = (subGroup: string) => {
    if (!selectedGroup) return;
    setSubGroups({
      ...subGroups,
      [selectedGroup]: subGroups[selectedGroup].filter((sg) => sg !== subGroup),
    });
    const newAgencyCodes = { ...agencyCodes };
    delete newAgencyCodes[subGroup];
    setAgencyCodes(newAgencyCodes);
    setSelectedSubGroup(null);
  };

  const filteredAgencyCodes = selectedSubGroup
    ? agencyCodes[selectedSubGroup].filter((code) =>
        code.includes(searchQuery)
      )
    : [];

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-8">AGENCY GROUPING</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Agency Groups */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Agency Groups</h2>
          <ul className="space-y-2">
            {agencyGroups.map((group) => (
              <li
                key={group}
                className={`p-2 rounded cursor-pointer ${
                  selectedGroup === group ? 'bg-blue-200' : 'bg-gray-100'
                }`}
                onClick={() => setSelectedGroup(group)}
              >
                {group}
                <button
                  className="ml-2 text-red-500"
                  onClick={() => handleDeleteGroup(group)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleAddGroup}
          >
            Add Group
          </button>
        </div>

        {/* Subgroups */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Subgroups</h2>
          <ul className="space-y-2">
            {selectedGroup &&
              subGroups[selectedGroup].map((subGroup) => (
                <li
                  key={subGroup}
                  className={`p-2 rounded cursor-pointer ${
                    selectedSubGroup === subGroup ? 'bg-blue-200' : 'bg-gray-100'
                  }`}
                  onClick={() => setSelectedSubGroup(subGroup)}
                >
                  {subGroup}
                  <button
                    className="ml-2 text-red-500"
                    onClick={() => handleDeleteSubGroup(subGroup)}
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
          {selectedGroup && (
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              onClick={handleAddSubGroup}
            >
              Add Subgroup
            </button>
          )}
        </div>

        {/* Agency Codes */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Agency Codes</h2>
          <input
            type="text"
            placeholder="Search agency codes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
          />
          <ul className="space-y-2">
            {filteredAgencyCodes.map((code) => (
              <li key={code} className="p-2 rounded bg-gray-100">
                <input type="checkbox" className="mr-2" />
                {code}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}