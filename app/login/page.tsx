
import VerticalFlexLayoutLogin from '@/app/ui/login/VerticalFlexLayoutlogin';
import styles from '@/app/ui/global_public.module.css';


export default function LoginPage() {
  return (

  <main  className={styles.backgrounds}>  
  <div className="fixed top-0 left-0 w-full h-20 flex items-center p-4 bg-black">
    <p className={`text-3xl text-white md:text-5xl bg-white-500 md:leading-normal`}>
      JULIETT</p>
  </div>
  <VerticalFlexLayoutLogin />
  <div className="fixed bottom-0 left-0 w-full h-30 flex items-center bg-black p-4">
<p className="text-m text-white md:text-m bg-white-500 md:leading-normal "> © Copyright 2025 JULIETT
</p>
</div>
</main>
);


}

