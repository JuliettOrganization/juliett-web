"use client";

import React, { useState, useEffect } from "react";
import { RectangleGroupIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SelectedFields from "@/app/home_account/reportdesign/ui/2_SelectedFields";
import { ButtonSave } from "@/app/ui_general/button";
import ConfirmationModal from "@/app/home_account/reportdesign/ui/2_ConfirmationModal";
import LoadingSpinner from "@/app/ui_general/LoadingSpinner";
import PopupNotification from "@/app/ui_general/PopupNotification";

interface LayoutRightPurplePanelProps {
  fields: string[];
  removeField: (field: string) => void;
  handleSave: () => void;
  handleRun: () => void;
}

const LayoutRightPurplePanel: React.FC<LayoutRightPurplePanelProps> = ({
  fields,
  removeField,
  handleSave,
  handleRun,
}) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRunPopup = () => {
    setIsModalOpen(true);
  };

  const handleNotSaveatRun = async () => {
    await handleRun();
    setIsModalOpen(false);
    setLoading(false);
  };

  const handleSaveatRun = async () => {
    await handleSave();
    await handleRun();
    setIsModalOpen(false);
    setLoading(false);
  };

  const handleSaveButton = async () => {
    await handleSave();
    setLoading(false);
  };

  useEffect(() => {
    setLoading(false); // Stop loading when the component mounts or updates
  }, []);

  return (
    <div className="fixed top-20 right-0 w-38 md:w-48 h-full z-10 bg-gray-400">
      <div className="mt-1 flex flex-row text-white font-bold text-2xl p-4 gap-4 items-center">
        <RectangleGroupIcon className="w-7 md:w-9" />
        <p>Group By</p>
      </div>
      <div className="flex flex-col space-y-4 h-3/5 overflow-y-auto">
        <SelectedFields fields={fields} removeField={removeField} />
      </div>
      <div className="absolute bottom-80 bg-red-700 flex flex-col justify-end gap-4 border-b-2 border-white pl-12 pr-24 mr-6 ml-6"></div>
      <div className="absolute bottom-32 flex flex-col gap-4 p-3 mr-6 ml-6">
        <Link
          href="/home_account/reportmanager"
          className="flex h-10 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          onClick={() => setLoading(true)}
        >
          Cancel
        </Link>
        <ButtonSave
          onClick={() => {
            setLoading(true);
            handleSaveButton();
          }}
          className="flex h-10 items-center justify-center rounded-full"
          type="submit"
        >
          Save Report
        </ButtonSave>
        <ButtonSave
          onClick={() => {
            handleRunPopup();
          }}
          className="flex h-10 items-center justify-center rounded-full"
          type="button"
        >
          Run Report
        </ButtonSave>
        <ConfirmationModal
          isOpen={isModalOpen}
          SaveConfirm={handleSaveatRun}
          SaveNotConfirm={handleNotSaveatRun}
        />
      </div>
      {loading && <LoadingSpinner />}
    </div>
  );
};

export default LayoutRightPurplePanel;
