import { Suspense } from 'react';
import { CardsSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/home_account/cards';

export default async function Page() {
  return (
    <main >
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8  bg-gray-300">
        <div className="rounded-xl bg-white p-10 shadow-sm">
          <div className="space-y-1">
            <div className="mb-4 text-xl md:text-4xl">HOME</div>
            <div className="mb-4 text-gray-500 text-sm md:text-base">
              Welcome. What are you up to today?
            </div>
            <div className="bg-white h-10"></div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
            <Suspense fallback={<CardsSkeleton />}>
              <CardWrapper />
            </Suspense>
          </div>
          <div className="bg-white h-10"></div>
        </div>
      </div>
    </main>
  );
}