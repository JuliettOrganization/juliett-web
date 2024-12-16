import { Suspense } from 'react';
import { CardsSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/home_user/cards';
import {auth} from '@/auth';



 
export default async function Page() {
 const session = await auth();
 
  return (
    <main className=" bg-gray-300 p-8">
      <div className="max-w-7xl mx-auto justify-center">
        <div className="p-8 rounded-lg mb-8">
          {session && session.user ? (
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome {session.user.name}!</h1>
          ) : (
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome !</h1>
          )}
          <p className="text-lg md:text-xl text-gray-600">Please select your account.</p>
        </div>
        <div className="flex justify-center w-[80vw] mx-auto">
          <Suspense fallback={<CardsSkeleton />}>
            <CardWrapper />
          </Suspense>
        </div>
      </div>
    </main>
  );
}