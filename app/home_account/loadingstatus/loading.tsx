import LoadingSpinner from '@/app/ui_general/LoadingSpinner';


export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoadingSpinner />
    </div>
  );
}