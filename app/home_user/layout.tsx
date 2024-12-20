
import Nav_home_user from '@/app/ui/home_user/nav_home_user';

    export default function Layout({ children }: { children: React.ReactNode }) {
      return (
        <div className="flex flex-col z-50 overflow-x-auto h-screen">
          <div className="fixed top-0 left-0 z-50 w-full h-20 flex items-center p-4 bg-black">
            <Nav_home_user />
          </div>
          <div className="flex-grow md:overflow-y-auto p-6 mt-20 h-full bg-gray-300">
            {children}
          </div>
        </div>
      );
    
}

