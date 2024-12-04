
import SideNav from '@/app/ui/dashboard/sidenav';

 

    export default function Layout({ children }: { children: React.ReactNode }) {
      return (
        <div className="flex flex-col overflow-x-auto h-screen">
          <div className="fixed  top-0 left-0 w-full h-20 flex items-center p-4 bg-black">
            <SideNav />
          </div>
          <div className="flex-grow md:overflow-y-auto p-6 mt-20 bg-gray-300">
            {children}
          </div>
        </div>
      );
    
}

