import { Suspense } from 'react';
import { CardsSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/home_user/cards';
 
export default async function Page() {
  return (
    <main className=" bg-gray-300 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="p-8 rounded-lg mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome User XXX</h1>
          <p className="text-lg md:text-xl text-gray-600">Please select your account.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Suspense fallback={<CardsSkeleton />}>
            <CardWrapper />
          </Suspense>
        </div>
      </div>
    </main>
  );
}