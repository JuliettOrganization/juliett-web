
import SideNav from '@/app/ui/dashboard/sidenav';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (

    <div className="flex flex-col h-screen"> 
    <div className="fixed top-0 left-0 w-full h-20 flex items-center p-4 bg-black">
       <SideNav /> 
       </div>
        <div className="flex-grow p-6 mt-20 md:overflow-y-auto md:p-12"> {children} 
          </div> 
          </div>

    // <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
    //   <div className="w-full flex-none md:w-64">
    //     <SideNav />
    //   </div>
    //   <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    // </div>
    
  );
}

