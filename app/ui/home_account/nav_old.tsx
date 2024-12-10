import Link from 'next/link';
import NavLinks from '@/app/ui/home_account/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';


export default function Nav() {
  return (
    <div className="topbar_flex space-x-24">
      <Link href="/home_user" >
      <div className="flex flex-row items-center"> 
      <div> 
        <p className="topbar_j_font"> J </p> </div>
        <div className=""> 
        <p className="topbar_uliett_font"> ULIETT </p> </div></div>
      </Link>

      <div className="flex text-white text-l grow flex-row justify-between items-center h-20 space-x-12 mr-32">
        <NavLinks />
        <div className="hidden h-full w-full grow  md:block" >
        </div>
        <form action={async () => { 'use server'; await signOut(); }} >
          <button className="flex h-[48px] text-white w-full items-center justify-center gap-2 p-4 text-l font-medium hover:text-blue-600">
            <PowerIcon className="w-8" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}