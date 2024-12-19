
import Nav from '@/app/ui/home_account/nav';

 

    export default function Layout({ children }: { children: React.ReactNode }) {
      return (
        <div className="w-full h-screen flex flex-col">
          <div className="fixed z-50 top-0 left-0 w-full h-20 flex items-center p-4 bg-black">
            <Nav />
          </div>
          <div className="w-full flex flex-col justify-between md:overflow-y-auto p-2 lg:p-6 z-20 mt-20 bg-gray-300">
            {children}
          </div>
        </div>
      );

    
}

