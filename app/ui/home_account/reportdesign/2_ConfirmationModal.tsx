import React from 'react';
import LoadingSpinner from '@/app/ui/LoadingSpinner';
import { useState } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  SaveConfirm: () => void;
  SaveNotConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, SaveConfirm, SaveNotConfirm }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Save Report</h2>
        <p className="mb-4">Do you want to save the report before running it?</p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => {
              setLoading(true);
              SaveNotConfirm();
            }}
          >
            No
          </button>
            <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              setLoading(true);
              SaveConfirm();
            }}
            >
            Yes
            </button>
        </div>
      </div>
      {loading && <LoadingSpinner />}
    </div>
  );
};

export default ConfirmationModal;