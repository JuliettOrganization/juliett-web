
'use client';
import styles from '@/ui_general/global_public.module.css';
import { useState } from 'react';
import LoginForm from '@/app/login/ui/login-form';
import Link from 'next/link';
import { ArrowRightIcon, EnvelopeIcon } from '@heroicons/react/24/outline';


export default function LoginPage() {
  const [isHovered, setIsHovered] = useState(false);
  return (

  <main  className={styles.backgrounds}>  
    <div className="topbar_flex">
      <div className="flex flex-row items-center"> 
 {/* <div> 
 <p className="topbar_j_font"> J </p> </div> */}
  <div> 
  <p className="topbar_uliett_font"> JULIETT </p> </div></div>
      </div>
      <div className="flex flex-col space-y-12">
        </div>
        <div className="flex flex-col space-y-6">
          <div className="mt-24 md:mt-36">
            <LoginForm />
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
          {/* <div>
            <Link
              href="/signin"
              className="flex items-center gap-5 self-start rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
              >
                  Sign Up
                  <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
          </div> */}
        </div>
  <div className="fixed bottom-0 left-0 w-full h-30 flex items-center bg-black p-4">
<p className="text-m text-white md:text-m bg-white-500 md:leading-normal "> © Cpyright 2025 JULIETT Software. All rights reserved.
</p>
</div>
</main>
);


}

