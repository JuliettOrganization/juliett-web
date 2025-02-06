"use client";

import { useState, useEffect } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

interface User {
  id: string;
  email: string;
}

interface UsersProps {
  initialSelectedUsers?: User[];
  onChange: (selectedUsers: User[]) => void;
}

export default function Users({
  initialSelectedUsers = [],
  onChange,
}: UsersProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] =
    useState<User[]>(initialSelectedUsers);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/account/getAllUsers");
        if (response.ok) {
          const data = await response.json();

          setUsers(data.rows);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    onChange(selectedUsers);
  }, [selectedUsers, onChange]);

  const filteredUsers =
    query === ""
      ? users
      : users.filter((user) =>
          user.email.toLowerCase().includes(query.toLowerCase()),
        );

  const handleSelect = (users: User[]) => {
    setSelectedUsers(users);
  };

  const handleRemove = (user: User) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-purple-500 w-[45vw]">
      <h2 className="text-2xl font-bold mb-4">Select Users</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Users
          </label>
          <Combobox value={selectedUsers} onChange={handleSelect} multiple>
            <div className="relative mt-1">
              <ComboboxInput
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(user: User) => user?.email || ""}
              />
              <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </ComboboxButton>
              <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {Array.isArray(filteredUsers) &&
                  filteredUsers.map((user) => (
                    <ComboboxOption
                      key={user.id}
                      value={user}
                      className={({ focus }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          focus ? "bg-indigo-600 text-white" : "text-gray-900"
                        }`
                      }
                    >
                      {({ selected, focus }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {user.email}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                focus ? "text-white" : "text-indigo-600"
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ComboboxOption>
                  ))}
              </ComboboxOptions>
            </div>
          </Combobox>
        </div>
        <div className="mt-4">
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedUsers.map((user) => (
              <span
                key={user.id}
                className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700"
              >
                {user.email}
                <button
                  type="button"
                  className="ml-2 text-indigo-500 hover:text-indigo-700"
                  onClick={() => handleRemove(user)}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
