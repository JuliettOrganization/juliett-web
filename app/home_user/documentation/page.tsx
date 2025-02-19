"use client";

import { Button } from "@/app/home_account/configuration/ui/sidebar/components/button";
import { Download } from "lucide-react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import LoadingSpinner from "@/app/ui_general/LoadingSpinner";
import PopupNotification from "@/app/ui_general/PopupNotification";

export default function PDFDownloader() {
  const handleDownload = async () => {
    try {
      // Replace with your actual PDF URL
      const response = await fetch("/docs/userguide.pdf", {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      });

      if (!response.ok) {
        throw new Error("PDF download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "userguide.pdf";
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download PDF");
    }
  };

  return (
    <main className="flex-col h-[80vh] items-center rounded-lg justify-center bg-gray-300">
      <div className="flex w-64 left-0 rounded-full justify-start p-3 shadow bg-gray-200 hover:bg-gray-200 z-10">
        <Link
          href="/home_user"
          className="flex items-center space-x-2 text-black"
        >
          <ArrowLeftIcon className="w-6 h-6" />
          <span className="text-xl"> | </span>
          <span>Back to Home Page</span>
        </Link>
      </div>
      <div className="max-w-2xl mx-auto mt-10 p-10 rounded-xl bg-white shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">User Guide</h1>
          <p className="text-lg mb-8">
            Welcome to JULIETT. Click the button below to download the user
            guide and get started.
          </p>

          <Button
            onClick={handleDownload}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Download className="h-4 w-4" />
            <span>Download User Guide</span>
          </Button>
        </div>
        {/* {loading && (
            <LoadingSpinner/>
          )}
          {popupMessage && (
            <PopupNotification
              message={popupMessage}
            />
          )} */}
      </div>
    </main>
  );
}
