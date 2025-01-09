'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import profile from '@/public/profile.jpg'; // Ensure the image path is correct
import Link from 'next/link';
import LoadingSpinner from '@/app/ui/LoadingSpinner';
import { usePathname } from 'next/navigation';

const NavHomeUserClient = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    setLoading(false); // Stop loading when the component mounts or updates
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [pathname]);

  const handleClick = () => {
    setLoading(true);
  };
  const handleSignOut = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/signOut', { method: 'POST' });
      if (response.ok) {
        console.log('Sign out successful, redirecting...');
        window.location.href = '/'; // Redirect to the home page
      } else {
        const errorText = await response.text();
        window.location.href = '/'; // Redirect to the home page
        console.error('Failed to sign out CLIENT SIDE', response.status, errorText);
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setIsMenuOpen(false);
  };
return (
  <>
      {loading && <LoadingSpinner />}
  <div className="flex justify-end relative">
      <button
        className="flex items-center gap-2 p-0 text-l font-medium text-white hover:text-gray-300"
        onClick={toggleMenu}
      >
        <div className="relative w-14 h-14">
          <Image
        src={profile}
        alt="Profile Picture"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: 'cover' }}
        className="rounded-full"
          />
        </div>
        <div className="flex flex-col text-left">
          <span className="hidden md:block text-xs">Jane Dutton</span>
          <span className="hidden md:block text-xs text-left text-gray-400">jane.dutton@travelggroup.com</span>
        </div>
        <ChevronDownIcon className="w-5 h-5 text-justify-start text-white"/>
      </button>
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute text-black z-50 mt-20 mr-14 w-48 bg-white shadow-lg rounded-lg"
        >
      
      <ul>
        <li className="px-4 py-2 hover:bg-gray-100 hover:rounded-t-lg cursor-pointer">
          <Link href="/home_user/profile" onClick={handleClick}>Profile</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <Link href="/home_user/documentation" onClick={handleClick}>Documentation</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <Link href="/home_user/support" onClick={handleClick}>Support</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <Link href="/home_user/admin" onClick={handleClick}>Admin (admin users only)</Link>
        </li>
        <li className="px-4 py-2 hover:bg-red-100 hover:rounded-b-lg cursor-pointer">
          <button type="button" onClick={handleSignOut}>Sign out</button>
        </li>
      </ul>
  
        </div>
      )}
    </div>
      </>
  );
};

export default NavHomeUserClient;