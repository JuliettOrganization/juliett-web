import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import VerticalFlexLayout from '@/app/VerticalFlexLayout';

export default function Page() {
  
  return (
    <main  className={styles.backgrounds}>
      
      <div className="fixed top-0 left-0 w-full h-20 flex items-center p-4" 
      style={{ backgroundColor: 'rgba(0, 0, 0,0.8)' }}>
        <p className={`text-3xl text-white md:text-5xl bg-white-500 md:leading-normal`}>
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
