'use client';

import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { AlertTriangle } from  'lucide-react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function LoadingPage() {
  return (
    <main className="fixed top-20 left-0 h-full w-full z-auto items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center" style={{ backgroundImage: "url('/accounts/image2.jpg')" }}>
      <div className="flex w-64 left-0 m-4 rounded-full justify-start p-3 shadow bg-gray-200 hover:bg-gray-200 z-10">
    <Link href="/home_user" className="flex items-center space-x-2 text-black">
    
      <ArrowLeftIcon className="w-6 h-6" />
      <span className="text-xl"> | </span>
      <span>Back to Home Account</span>
    </Link>
    </div>
      <div className="max-w-2xl mx-auto mt-20 p-10 rounded-xl bg-white shadow-lg bg-opacity-90">
        <div className="text-center">
          <AlertTriangle className="mx-auto mb-6 w-24 h-24 text-orange-600" />
          <h1 className="text-3xl font-bold mb-4">Page under construction</h1>
          <p className="text-lg mb-8">
            If you need any assistance, please contact our support team.
          </p>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <EnvelopeIcon className="w-6 h-6 text-blue-600" />
              <a
                href="mailto:support@juliett.com"
                className="text-lg font-medium text-blue-600 hover:underline"
              >
                support@juliett.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}