'use client';

import { useState } from 'react';
import Image, { StaticImageData } from 'next/image'; 
import profile from '@/public/profile.png';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function ProfilePage() {
  const [name, setName] = useState('John Dutton');
  const [email] = useState('john.dutton@example.com'); // Removed setEmail since we won't be changing this
  const [country, setCountry] = useState('United States');
  const [language, setLanguage] = useState('English');
  const [profilePic, setProfilePic] = useState<string | StaticImageData>(profile);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          setProfilePic(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <main>
         <div className="flex w-64 left-0 rounded-full justify-start p-3 shadow bg-gray-200 hover:bg-purple-200 z-10">
    <Link href="/home_user" className="flex items-center space-x-2 text-purple-600">
    
      <ArrowLeftIcon className="w-6 h-6" />
      <span className="text-xl"> | </span>
      <span>Back to Home Page</span>
    </Link>
    </div>
      <div className="max-w-4xl mx-auto mt-20 p-10 rounded-xl bg-gray-50 shadow-sm">
   
        <div className="text-center">
          <div className="relative w-64 h-64 mx-auto">
            <Image
              src={profilePic}
              alt="Profile Picture"
              layout="fill"
              className="rounded-xl object-cover"
            />
            <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-xl">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleProfilePicChange}
              />
              Change Profile Picture
            </label>
          </div>
          <h1 className="mt-4 text-xl md:text-4xl font-bold">Profile</h1>
          <p className="mt-2 text-gray-500 text-sm md:text-base">Manage your profile information</p>
        </div>
        <div className="mt-10 space-y-4">
          <form>
            <div className="flex flex-col space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Language</label>
                <input
                  type="text"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
