import React from 'react';

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  confirmDelete: () => void;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  isOpen,
  setIsOpen,
  confirmDelete,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-60"></div>
      <div className="bg-white rounded-lg p-6 z-10 w-96">
        <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
        <p className="mb-4">Are you sure you want to delete this item?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="bg-gray-100 text-gray-600 py-2 px-4 rounded"
            onClick={() => setIsOpen(false)}
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
  );
};

export default DeleteConfirmationDialog;