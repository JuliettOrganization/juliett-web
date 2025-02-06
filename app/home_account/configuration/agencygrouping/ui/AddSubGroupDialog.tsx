import React from 'react';

interface AddSubGroupDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  newSubGroupName: string;
  setNewSubGroupName: (name: string) => void;
  handleAddSubGroup: () => void;
}

const AddSubGroupDialog: React.FC<AddSubGroupDialogProps> = ({
  isOpen,
  setIsOpen,
  newSubGroupName,
  setNewSubGroupName,
  handleAddSubGroup,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-60"></div>
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
            onClick={() => setIsOpen(false)}
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
  );
};

export default AddSubGroupDialog;