
import Nav from '@/app/home_account/ui/Account_NAV_1_structure';


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
   
    <div className="w-full h-full min-h-screen flex flex-col">
      <div className="fixed z-50 top-0 left-0 w-full h-20 flex items-center justify-center p-4 bg-black">
        <Nav />
      </div>
      <div className="flex-grow w-full flex flex-col justify-between p-2 lg:p-6 z-20 mt-20 bg-gray-300">
        {children}
      </div>
    </div>

  );
}

