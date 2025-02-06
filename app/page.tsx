"use client";
import Link from "next/link";
import { ArrowRightIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Page() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <main
      className="fixed top-0 left-0 h-full w-full z-auto items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center"
      style={{ backgroundImage: "url('/accounts/image2.jpg')" }}
    >
      <div className="topbar_flex">
        <div className="flex flex-row items-center">
          <div>
            <p className="topbar_uliett_font"> JULIETT </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col m-8 space-y-6 max-w-64 md:m-16">
        <div className="mb-8 mt-60 text-5xl">
          <p>
            <strong>Welcome</strong>
          </p>
        </div>

        <div>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span>
            <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>

        <div>
          <Link
            href="/contactus"
            className="flex items-center gap-5 self-start rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? (
              <>
                <EnvelopeIcon className="w-5 md:w-6" />
                <span>support@juliett.com</span>
              </>
            ) : (
              <>
                <span>Contact us</span>
                <ArrowRightIcon className="w-5 md:w-6" />
              </>
            )}
          </Link>
        </div>
      </div>
      <div
        className="fixed bottom-0 left-0 w-full h-30 flex items-center bg-black p-4"
        style={{ backgroundColor: "rgba(0, 0, 0,1)" }}
      >
        <p className="text-m text-white md:text-m bg-white-500 md:leading-normal">
          © Copyright 2025 JULIETT Software. All rights reserved.
        </p>
      </div>
    </main>
  );
}
