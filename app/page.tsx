
import styles from '@/app/ui/global_public.module.css';
import VerticalFlexLayout from '@/app/VerticalFlexLayout';

export default function Page() {
  
  return (
    <main  className={styles.backgrounds}>   {/* This is the backround picture */}
  
      
      <div className="topbar_flex">
        <p className="topbar_juliett_font">
          JULIETT</p>
      </div>
      <VerticalFlexLayout />
      <div className="fixed bottom-0 left-0 w-full h-30 flex items-center bg-black p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0,0.8)' }}>
  <p className="text-m text-white md:text-m bg-white-500 md:leading-normal "
  
  > © Copyright 2025 JULIETT
  </p>
</div>
    </main>
  );
}
