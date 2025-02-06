"use client";

import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import profile from "@/public/profile.jpg";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import PopupNotification from "@/app/ui_general/PopupNotification";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [profilePic, setProfilePic] = useState<string | StaticImageData>(
    profile,
  );
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("/api/home_user/fetchUserDetailsProfile");
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await response.json();
        setName(data.name);
        setEmail(data.email);
        setRole(data.role);
        setCountry(data.country);
        setLanguage(data.language);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          setProfilePic(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    try {
      // Upload profile picture if a file is selected

      // Update user details
      const userDetailsResponse = await fetch(
        "/api/home_user/storeUserDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, country, language }),
        },
      );

      if (!userDetailsResponse.ok) {
        throw new Error("Failed to update user details");
      }

      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000); // Hide the popup after 3 seconds
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <main>
      <div className="flex w-64 left-0 rounded-full justify-start p-3 shadow bg-gray-200 hover:bg-gray-300 z-10">
        <Link
          href="/home_user"
          className="flex items-center space-x-2 text-black"
        >
          <ArrowLeftIcon className="w-6 h-6" />
          <span className="text-xl"> | </span>
          <span>Back to Home Page</span>
        </Link>
      </div>
      <div className="max-w-4xl mx-auto mt-16 p-10 rounded-xl bg-gray-50 shadow-sm">
        <div className="text-center">
          <div className="relative w-64 h-64 mx-auto">
            <Image
              src={profilePic}
              alt="Profile Picture"
              layout="fill"
              className="rounded-xl object-cover"
              priority
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
          <p className="mt-2 text-gray-500 text-sm md:text-base">
            Manage your profile information
          </p>
        </div>
        <div className="mt-10 space-y-4">
          <form>
            <div className="flex flex-col space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <input
                  type="text"
                  value={role}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Language
                </label>
                <input
                  type="text"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mt-6">
                <button
                  onClick={handleSave}
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Save Changes
                </button>
              </div>
              <PopupNotification
                message={showPopup ? "Profile saved successfully!" : null}
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
