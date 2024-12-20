import { Suspense } from 'react';
import { CardsSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/home_account/cards';

export default async function Page() {
  return (
    <main >
      <div className="w-full h-full p-4 sm:p-6 lg:p-8 justify-center bg-gray-300">
        <div className="p-10">
          <div className="space-y-1">
            <div className="mb-4 text-4xl">ACCOUNT HOME</div>
            <div className="mb-4 text-gray-500 text-sm md:text-base">
              Welcome. What are you up to today?
            </div>
            <div className="h-10"></div>
          </div>

            <div className="flex w-full">
            <Suspense fallback={<CardsSkeleton />}>
              <CardWrapper />
            </Suspense>
            </div>
          <div className="h-10"></div>
        </div>
      </div>
    </main>
  );
}