
import styles from '@/app/ui/global_public.module.css';
import VerticalFlexLayout from '@/app/VerticalFlexLayout';

export default function Page() {
  
  return (
    <main className="fixed top-0 left-0 h-full w-full z-auto items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center" style={{ backgroundImage: "url('/accounts/image2.jpg')" }}>
  
      
      <div className="topbar_flex">
      <div className="flex flex-row items-center"> 
{/* <div> 
  <p className="topbar_j_font"> J </p> </div> */}
  <div> 
  <p className="topbar_uliett_font"> JULIETT </p> </div></div>
      </div>
      <VerticalFlexLayout />
      <div className="fixed bottom-0 left-0 w-full h-30 flex items-center bg-black p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0,1)' }}>
  <p className="text-m text-white md:text-m bg-white-500 md:leading-normal "
  
  > © Copyright 2025 JULIETT
  </p>
</div>
    </main>
  );
}
