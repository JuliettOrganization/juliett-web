'use client';
import CheckBoxGroupingAgency from '@/app/ui/home_account/reportdesign/3_tab2_filter-form-check-box-agency';
import CheckBoxOperating from './3_tab2_filter-form-check-box-operating';
import CheckBoxIssuing from './3_tab2_filter-form-check-box-issuing';
import CheckBoxMarketing from './3_tab2_filter-form-check-box-marketing';
import CheckBoxGeoTo from './3_tab2_filter-form-check-box-geo-to';
import CheckBoxGeoFrom from './3_tab2_filter-form-check-box-geo-from';
import RadioButtonListItinerary from './3_tab2_filter-form-radio-button-itinerary';
import ToggleSwitchItinerary from './3_tab2_filter-form-toggle-exclude';


export default function FilterForm() {

  return (
    
    <form className="flex flex-col overflow-x-auto">
      
       {/* AGENCY FILTERING*/}
       <div className="flex flex-row rounded-lg sm:w-[90vw] bg-white pl-4"> 
         <div className="flex flex-row rounded-lg bg-white w-56 items-center"> 
                <label className="flex h-[70%] text-l items-center justify-center pr-4 text-black font-bold bg-white border-r-4 border-gray-700 w-96"> 
                Agency Filtering
                </label> 
            </div>
      <div className="rounded-md bg-white items-center">
        
      <div className="flex flex-row rounded-md bg-white pt-4 pr-4 pl-6 pb-1 space-x-6 items-center">
    
         <div className="mb-4 items-center">
          <label htmlFor="AgencyGroup" className="mb-2 block text-sm font-medium w-64">
          Agency Group Name
          </label>
          <div className="relative">
            <select
              id="AgencyGroup"
              name="AgencyGroup"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              defaultValue="None"
            >

                 {/* THIS SHOULD COME FROM DATABASE BASED ON USER/ACCOUNT GROUPINGS */}
           <option value="None" className="bg-white"></option>
           <option value="Grouping 1" className="bg-white">Grouping 1</option>
           <option value="Grouping 2" className="bg-white">Grouping 2</option>
           <option value="Grouping 3" className="bg-white">Grouping 3</option>
            </select>
          </div>
        </div>

         {/* Grouping values filtering */}
    
         <CheckBoxGroupingAgency />

         </div>
         </div>

         </div>

 {/* AIRLINE FILTERING*/}
 <div className="flex flex-row sm:w-[90vw] bg-gray-200 pt-2 pb-2 pl-4"> 
         <div className="flex flex-row bg-gray-200 w-56 items-center "> 
                <label className="flex h-[90%] text-l items-center justify-center pr-4 text-black bg-gray-200 font-bold border-r-4 border-gray-700 w-96"> 
                Airline Filtering 
                </label> 
            </div>
 <div className="rounded-md">
         
      <div className="flex flex-row  bg-gray-200  pt-4 pr-4 pl-6 pb-1 space-x-6">
    
         <div className="mb-4">
          <label htmlFor="Issuing" className="mb-2 block text-sm font-medium w-64">
          Issuing Airline Group Type
          </label>
          <div className="relative">
            <select
              id="Issuing"
              name="Issuing"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              defaultValue="None"
            >

                 {/* THIS SHOULD COME FROM DATABASE BASED ON USER/ACCOUNT GROUPINGS */}
           <option value="None" className="bg-white"></option>
           <option value="Grouping 1" className="bg-white">Airline Country</option>
           <option value="Grouping 2" className="bg-white">Airline Name</option>
            </select>
          </div>
        </div>

         {/* Grouping values filtering */}
    
         <CheckBoxIssuing />
      

         
         </div>

         <div className="flex flex-row  bg-gray-200  pt-0 pr-4 pl-6 pb-1 space-x-6">
    
         <div className="mb-4">
          <label className="mb-2 block text-sm font-medium w-64">
          Marketing Airline Group Type
          </label>
          <div className="relative">
            <select
              id="Marketing"
              name="Marketing"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              defaultValue="None"
            >

                 {/* THIS SHOULD COME FROM DATABASE BASED ON USER/ACCOUNT GROUPINGS */}
                 <option value="None" className="bg-white"></option>
           <option value="Grouping 1" className="bg-white">Airline Country</option>
           <option value="Grouping 2" className="bg-white">Airline Name</option>
            </select>
          </div>
        </div>

         {/* Grouping values filtering */}
    
         <CheckBoxMarketing />
      

         
         </div>

         <div className="flex flex-row bg-gray-200 pt-0 pr-4 pl-6 pb-1 space-x-6">
    
         <div className="mb-4">
          <label className="mb-2 block text-sm font-medium w-64">
          Operating Airline Group Type
          </label>
          <div className="relative">
            <select
              id="Operating"
              name="Operating"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              defaultValue="None"
            >

                 {/* THIS SHOULD COME FROM DATABASE BASED ON USER/ACCOUNT GROUPINGS */}
                 <option value="None" className="bg-white"></option>
           <option value="Grouping 1" className="bg-white">Airline Country</option>
           <option value="Grouping 2" className="bg-white">Airline Name</option>
            </select>
          </div>
        </div>

         {/* Grouping values filtering */}
    
         <CheckBoxOperating />
         </div>
         </div>
         <div className="flex flex-grow w-full bg-gray-200"> 
                <label className="ml-auto items-center text-gray-200 bg-gray-200"> 
                 
                </label> 
            </div>


         </div>


         {/* GEO FILTERING*/}
         <div className="flex flex-row rounded-lg bg-white pt-2 pb-2 pl-4"> 
         <div className="flex flex-row bg-white w-56 items-center"> 
                <label className="flex h-[80%] text-l items-center text-center pr-4 text-black bg-white font-bold border-r-4 border-gray-700 w-96"> 
                Origin & Destination Filtering 
                </label> 
            </div>
      <div className="rounded-md bg-white">
           
      <div className="flex flex-row rounded-md bg-white pt-4 pr-4 pl-6 pb-1 space-x-6">
    
         <div className="mb-4">
          <label className="mb-2 block text-sm font-medium w-64">
          Origin Type
          </label>
          <div className="relative">
            <select
              id="Origin"
              name="Origin"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              defaultValue="None"
            >

                 {/* THIS SHOULD COME FROM DATABASE BASED ON USER/ACCOUNT GROUPINGS */}
           <option value="None" className="bg-white"></option>
           <option value="Grouping 1" className="bg-white">Airport</option>
           <option value="Grouping 2" className="bg-white">City</option>
           <option value="Grouping 3" className="bg-white">Country</option>
           <option value="Grouping 3" className="bg-white">Region</option>
           <option value="Grouping 3" className="bg-white">User Grouping 1</option>
            </select>
          </div>
        </div>

         {/* Grouping values filtering */}
    
         <CheckBoxGeoFrom />

         
         </div>

      <div className="flex flex-row rounded-md bg-white pt-0 pr-4 pl-6 pb-1 space-x-6">
    
         <div className="mb-4">
          <label className="mb-2 block text-sm font-medium w-64">
          Destination Type
          </label>
          <div className="relative">
            <select
              id="destination"
              name="destination"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              defaultValue="None"
            >

                 {/* THIS SHOULD COME FROM DATABASE BASED ON USER/ACCOUNT GROUPINGS */}
                 <option value="None" className="bg-white"></option>
           <option value="Grouping 1" className="bg-white">Airport</option>
           <option value="Grouping 2" className="bg-white">City</option>
           <option value="Grouping 3" className="bg-white">Country</option>
           <option value="Grouping 3" className="bg-white">Region</option>
           <option value="Grouping 3" className="bg-white">User Grouping 1</option>
            </select>
          </div>
        </div>

         {/* OD Filetrs */}
    
         <CheckBoxGeoTo />
         </div>    
         </div>

        {/* SEPARATION UI */}
         <div className="flex flex-row bg-white w-20 items-center"> 
                <label className="flex h-[80%] text-l items-center text-center pr-4 text-gray-500 bg-white font-medium border-r-4 border-gray-400 w-96"> 
                
                </label> 
            </div>

         <div className="rounded-md bg-white">
           
         {/* OD CONCEPT RADIO BUTTON */}

      <div className="flex flex-col rounded-md bg-white pt-4 pr-4 pl-6 pb-1 justify-start">
          <label className="mb-2 block text-sm font-medium">
          O&D Concept
          </label>
          <div className="relative">
          <RadioButtonListItinerary/>
          </div>
          </div>      
          </div>  
            {/* SEPARATION UI */}
         <div className="flex flex-row bg-white w-20 items-center"> 
                <label className="flex h-[80%] text-l items-center text-center pr-4 text-gray-500 bg-white font-medium border-r-4 border-gray-400 w-96"> 
                
                </label> 
            </div>

         <div className="rounded-md">
           
         {/* OD Filtering TOGGLE */}

      <div className="flex-col w-auto rounded-md bg-white pt-4 pr-4 pl-6 pb-1 justify-start">
          <label className="mb-2 block text-sm font-medium">
          O&D Filtering
          </label>
          <div className="relative">
          <ToggleSwitchItinerary onChange={(info) => console.log(info)} />
          </div>   
 
       
          </div>  
         </div>
         </div>
         </form>
      
     
   
  );
}

