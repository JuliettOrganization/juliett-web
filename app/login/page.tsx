import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import VerticalFlexLayoutLogin from '@/app/VerticalFlexLayoutlogin';
import styles from '@/app/ui/home.module.css';


export default function LoginPage() {
  return (
//     <main className="flex items-center justify-center md:h-screen">
//       <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
//         <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
//           <div className="w-32 text-white md:w-36">
//             <AcmeLogo />
//           </div>
//         </div>
//         <LoginForm />
//       </div>
//     </main>
//   );

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

