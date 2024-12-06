import { Suspense } from 'react';
import { CardsSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/account_selection/cards';
 
export default async function Page() { 
  return (
    <main>
        <div className='mb-4 text-xl md:text-4xl p-8'>
        Welcome User XXX, please select your account.
        </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
      <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
    


    </main>
  );
}