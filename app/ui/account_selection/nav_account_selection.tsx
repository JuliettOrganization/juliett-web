import Link from 'next/link';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';


export default function Nav_account_selection() {
  return (
    <div className="topbar_flex space-x-24">
    <Link href="/account_selection" >
    <div className="flex flex-row items-center"> 
    <div> 
      <p className="topbar_j_font"> J </p> </div>
      <div> 
      <p className="topbar_uliett_font"> ULIETT </p> </div></div>
    </Link>
      <div className="flex justify-end"> 
        <form action={async () => { 'use server'; await signOut(); }}> 
            <button className="flex h-[48px] text-white items-center gap-2 p-4 text-l font-medium hover:text-purple-500"> 
              <PowerIcon className="w-8" /> 
              <div className="hidden md:block">
                Sign Out
                </div> 
            </button> 
        </form> 
      </div>
      </div>
   
  );
}