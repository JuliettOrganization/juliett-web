// components/VerticalFlexLayout.js
import styles from '@/app/ui/home.module.css';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import LoginForm from '@/app/ui/login-form';


const VerticalFlexLayoutLogin = () => {
  return (
    <div className={styles.container}>
    
      <div className={styles.leftPanel}>
        <div className="flex flex-col space-y-12"> 
                    <div>
                   
                   </div>
                   <div>
                   
                   </div>
              
                <div>
                   
                </div>
                </div>
                <div className="flex flex-col space-y-6"> 
                <div >
                <LoginForm />
                </div>

                <div >
                   
                   <Link href="/contactus" 
                   className="flex items-center gap-5 self-start rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base" > 
                   <span>Contact us</span> 
                   <ArrowRightIcon className="w-5 md:w-6" /> 
                   </Link>
                   </div>
            </div>
      </div>


      <div className={styles.rightPanel}>
        <p>J</p>
     </div>
 </div>
   
  );
};

export default VerticalFlexLayoutLogin;
