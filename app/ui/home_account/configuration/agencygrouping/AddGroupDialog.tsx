import React from 'react';

interface AddGroupDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  newGroupName: string;
  setNewGroupName: (name: string) => void;
  handleAddGroup: () => void;
}

const AddGroupDialog: React.FC<AddGroupDialogProps> = ({
  isOpen,
  setIsOpen,
  newGroupName,
  setNewGroupName,
  handleAddGroup,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-60"></div>
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
            onClick={() => setIsOpen(false)}
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
  );
};

export default AddGroupDialog;