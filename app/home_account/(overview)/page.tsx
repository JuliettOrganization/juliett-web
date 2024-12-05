import { Suspense } from 'react';
import { CardsSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/home_account/cards';
 
export default async function Page() { 
  return (
    <main>
     <div className="rounded-xl bg-gray-50 p-10 shadow-sm mr-40 ml-40 mt-20"> 
      <div className='space-y-1 mr-8 ml-7' >
      <div className='mb-4 text-xl md:text-4xl'>
        HOME
        </div> 
        <div className='mb-4 text-gray-500 text-sm md:text-base'>
        Welcome. What are you up to today?
      </div>
      <div className="bg-gray-50 h-10"> </div>
      <div> </div>
      <div> </div>
      <div> <div></div></div>
</div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
      <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="bg-gray-50 h-10"> </div>
      </div>

    </main>
  );
}