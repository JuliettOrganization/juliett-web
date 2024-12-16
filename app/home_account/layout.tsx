
import Nav from '@/app/ui/home_account/nav';

 

    export default function Layout({ children }: { children: React.ReactNode }) {
      return (
        <div className="flex flex-col overflow-x-auto h-screen">
          <div className="fixed z-50 top-0 left-0 w-full h-20 flex items-center p-4 bg-black">
            <Nav />
          </div>
          <div className="flex-grow md:overflow-y-auto p-2 lg:p-6 z-20 mt-20 bg-gray-300">
            {children}
          </div>
        </div>
      );
    
}

