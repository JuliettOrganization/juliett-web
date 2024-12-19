'use client';
import ClassMappingSelection from '@/app/ui/home_account/configuration/classmapping/configuration-tab-classmapping_selection'; // Updated import
import ClassMappingTable from '@/app/ui/home_account/configuration/classmapping/configuration-tab-classmapping_table'; // Updated import
import '@/app/ui/global_public.module.css'; // Updated import
export default function Page() { 
    return (
      <main >
       <div className="rounded-xl border-none p-2 ml-2 w-full"> 
        <div className='space-y-2 ml-8 w-full' >
        <div className='mb-4 text-xl md:text-4xl w-full'>
          CLASS MAPPING
          </div> 
          <div className="flex flex-col w-[73vw] p-2 bg-white rounded">
              <div className="flex flex-col w-full p-4 items-center bg-white rounded space-y-2"> 
                <ClassMappingSelection />
              </div>
              <div className="flex flex-col w-full p-4 items-center bg-white rounded space-y-2"> 
             
                <ClassMappingTable />
              </div>
              
            </div>
        </div>
        </div>
      </main>
    );
  }