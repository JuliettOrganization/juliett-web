'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import profile from '@/public/profile.png'; // Ensure the image path is correct
import Link from 'next/link';

const NavHomeUserClient = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/signOut', { method: 'POST' });
      if (response.ok) {
        console.log('Sign out successful, redirecting...');
        window.location.href = '/'; // Redirect to the home page
      } else {
        const errorText = await response.text();
        console.error('Failed to sign out CLIENT SIDE', response.status, errorText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-end relative">
      <button
        className="flex items-center gap-2 p-4 text-l font-medium text-white hover:text-purple-500"
        onClick={toggleMenu}
      >
        <Image
          src={profile}
          alt="Profile Picture"
          className="w-16 h-16 p-1 rounded-full"
        />
        <span>John Dutton</span>
        <ChevronDownIcon className="w-5 h-5 text-white" />
      </button>
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute text-black z-50 mt-20 w-48 bg-white shadow-lg rounded-lg"
        >
          <ul>
            <li className="px-4 py-2 hover:bg-gray-100 hover:rounded-t-lg cursor-pointer">
              <Link href="/home_user/profile">Profile</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link href="/home_user/documentation">Documentation</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link href="/home_user/support">Support</Link>
            </li>
            <li className="px-4 py-2 hover:bg-red-100 hover:rounded-b-lg cursor-pointer">
              <button type="button" onClick={handleSignOut}>Sign out</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavHomeUserClient;