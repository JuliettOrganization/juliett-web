import React,  { Suspense } from 'react';
import { CardsSkeleton } from '@/app/ui/skeletons';
import Cards from '@/app/ui/home_user/cards';
import {auth} from '@/auth';
import HomeUserSkeleton from '@/app/ui/skeletons';

 
export default async function Page() {
 const session = await auth();
 
 
  return (
    <main className=" bg-gray-300 p-8">
      <Suspense fallback={<HomeUserSkeleton />}>
      <div className="mx-auto justify-center">
        <div className="rounded-lg mb-8 w-[80vw] mx-auto">
          {session && session.user ? (
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome {session.user.name}!</h1>
          ) : (
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome !</h1>
          )}
          <p className="text-lg md:text-xl text-gray-600">Please select a card.</p>
        </div>
        <div className="flex justify-center w-[80vw] mx-auto">
          
            <Cards />
        
        </div>
      </div>
      </Suspense>
    </main>
  );
}