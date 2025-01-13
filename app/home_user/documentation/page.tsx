'use client';

import { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function UserGuidePage() {
  const [downloadLink] = useState('/api/docs/download-userguide-rtf.ts'); // Path to the API route

  return (
    <main className="flex-col h-[80vh] items-center rounded-lg justify-center bg-gray-300">
        <div className="flex w-64 left-0 rounded-full justify-start p-3 shadow bg-gray-200 hover:bg-gray-200 z-10">
    <Link href="/home_user" className="flex items-center space-x-2 text-black">
    
      <ArrowLeftIcon className="w-6 h-6" />
      <span className="text-xl"> | </span>
      <span>Back to Home Page</span>
    </Link>
    </div>
      <div className="max-w-2xl mx-auto mt-10 p-10 rounded-xl bg-white shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">User Guide</h1>
          <p className="text-lg mb-8">
            Welcome to JULIETT. Click the button below to download the user guide and get started.
          </p>
          <a
            href={downloadLink}
            download
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ArrowDownTrayIcon className="w-6 h-6 mr-2" />
            Download User Guide
          </a>
        </div>
      </div>
    </main>
  );
}