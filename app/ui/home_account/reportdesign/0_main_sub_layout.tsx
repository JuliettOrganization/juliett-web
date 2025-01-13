// create-form-layout-page.tsx
'use client';
import React, { useState } from 'react';
import LayoutRightPurplePanel from './2_layout_right_purple_panel';
import LayoutMainInfoForm from './1_layout_main_info_form';
import FilterForm  from '@/app/ui/home_account/reportdesign/3_tab2_filter-form';
import FieldButtons from '@/app/ui/home_account/reportdesign/3_tab1_FieldButtons';
import ToggleSwitchCustomSql from './3_tab3_custom-sql-toggle';
import TextBoxSQL from './3_tab3_custom-sql';
import MainOptionsForm from './3_tab0_main_options';
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAccount } from '@/app/context/AccountContext';
import PopupNotification from '@/app/ui/PopupNotification';



// const defaultDateConcept = 'Issue Date';
// const defaultDateFrom = '2025-01-01';
// const defaultDateTo = '2025-12-31';
// const defaultBenchmarkPeriod = 'Yes';
// const defaultBenchmarkDateFrom = '2024-01-01';
// const defaultBenchmarkDateTo = '2024-12-31';
// const defaultODconcept = 'Ticket based';
// const defaultODfiltering = 'Include';


interface CreateFormLayoutProps {
  reportName: string;
  description: string;
  tags: string[];
  dateConcept: string;
  dateFrom: string;
  dateTo: string;
  benchmarkPeriod: string;
  benchmarkDateFrom: string;
  benchmarkDateTo: string;
  currency: string;
  fields: string[];
  transactionType: string[];
  amounts: string[];
  ODconcept: string;
  ODfiltering: string;
  isCustomSqlActive: boolean;
  selectedGroupingAgency: string;
  selectedGroupingGeoFrom: string;
  selectedGroupingGeoTo: string;
  selectedGroupingIssuing: string;
  selectedGroupingMarketing: string;
  selectedGroupingOperating: string;
  selectedGroupingValuesAgency: string[];
  selectedGroupingValuesGeoFrom: string[];
  selectedGroupingValuesGeoTo: string[];
  selectedGroupingValuesIssuing: string[];
  selectedGroupingValuesMarketing: string[];
  selectedGroupingValuesOperating: string[];
  sqlCode: string;
  reportid?: string; // Add reportid as an optional prop
}

const CreateFormLayout: React.FC<CreateFormLayoutProps> = ({
  reportName: initialReportName,
  description: initialDescription,
  tags: initialTags,
  dateConcept: initialDateConcept,
  dateFrom: initialDateFrom,
  dateTo: initialDateTo,
  benchmarkPeriod: initialBenchmarkPeriod,
  benchmarkDateFrom: initialBenchmarkDateFrom,
  benchmarkDateTo: initialBenchmarkDateTo,
  currency: initialCurrency,
  fields: initialFields,
  transactionType: initialTransactionType,
  amounts: initialAmounts,
  ODconcept: initialODconcept,
  ODfiltering: initialODfiltering,
  isCustomSqlActive: initialIsCustomSqlActive,
  selectedGroupingAgency: initialSelectedGroupingAgency,
  selectedGroupingGeoFrom: initialSelectedGroupingGeoFrom,
  selectedGroupingGeoTo: initialSelectedGroupingGeoTo,
  selectedGroupingIssuing: initialSelectedGroupingIssuing,
  selectedGroupingMarketing: initialSelectedGroupingMarketing,
  selectedGroupingOperating: initialSelectedGroupingOperating,
  selectedGroupingValuesAgency: initialSelectedGroupingValuesAgency,
  selectedGroupingValuesGeoFrom: initialSelectedGroupingValuesGeoFrom,
  selectedGroupingValuesGeoTo: initialSelectedGroupingValuesGeoTo,
  selectedGroupingValuesIssuing: initialSelectedGroupingValuesIssuing,
  selectedGroupingValuesMarketing: initialSelectedGroupingValuesMarketing,
  selectedGroupingValuesOperating: initialSelectedGroupingValuesOperating,
  sqlCode: initialSqlCode,
  reportid, // Add reportid to the destructured props
}) => {
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const availableFields = [
    'agency code (booking)', 'agency code (issuing)', 'airline code (marketing)',
    'commission (total)', 'coupon number', 'currency code (local)', 'date (issuing)',
    'date (travel)', 'deal code (GNR5)', 'destination (coupon level)',
    'destination airport code (ticket level)', 'destination city code (coupon level)',
    'destination city code (ticket level)', 'destination country code (ticket level)',
    'destination country code (coupon level)', 'domestic international flag', 'EMD remarks',
    'endorsement remarks', 'fare basis', 'flight number', 'gross amount (local currency)',
    'origin (coupon level)', 'origin airport code (ticket level)', 'origin city code (coupon level)',
    'origin city code (ticket level)', 'origin country code (ticket level)', 'origin country code (coupon level)',
    'passenger date of birth', 'passenger FFP', 'passenger name', 'passenger PNR', 'passenger Type',
    'RBD', 'RDII', 'reason for issuance code', 'Reporting System', 'routing', 'Sector Number',
    'stopover', 'taxes', 'ticket number (original reference)', 'ticket number (primary)',
    'ticket number (refunded)', 'ticket number (TDNR)', 'tour code', 'transaction code',
    'yq amount (local currency)', 'yr amount (local currency)',
  ];
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isDropdownOpenAgency, setIsDropdownOpenAgency] = useState<boolean>(false);
  const [isDropdownOpenIssuing, setIsDropdownOpenIssuing] = useState<boolean>(false);
  const [isDropdownOpenMarketing, setIsDropdownOpenMarketing] = useState<boolean>(false);
  const [isDropdownOpenOperating, setIsDropdownOpenOperating] = useState<boolean>(false);
  const [isDropdownOpenGeoFrom, setIsDropdownOpenGeoFrom] = useState<boolean>(false);
  const [isDropdownOpenGeoTo, setIsDropdownOpenGeoTo] = useState<boolean>(false);
  const toggleDropdownAgency = () => {setIsDropdownOpenAgency(!isDropdownOpenAgency);};
  const toggleDropdownIssuing = () => {setIsDropdownOpenIssuing(!isDropdownOpenIssuing);};
  const toggleDropdownMarketing = () => {setIsDropdownOpenMarketing(!isDropdownOpenMarketing);};
  const toggleDropdownOperating = () => {setIsDropdownOpenOperating (!isDropdownOpenOperating);};
  const toggleDropdownGeoFrom = () => {setIsDropdownOpenGeoFrom (!isDropdownOpenGeoFrom);};
  const toggleDropdownGeoTo = () => {setIsDropdownOpenGeoTo (!isDropdownOpenGeoTo);};

  const [reportName, setReportName] = useState<string>(initialReportName);
  const [description, setDescription] = useState<string>(initialDescription);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [dateConcept, setDateConcept] = useState<string>(initialDateConcept);
  const [dateFrom, setDateFrom] = useState<string>(initialDateFrom);
  const [dateTo, setDateTo] = useState<string>(initialDateTo);
  const [benchmarkPeriod, setBenchmarkPeriod] = useState<string>(initialBenchmarkPeriod);
  const [benchmarkDateFrom, setBenchmarkDateFrom] = useState<string>(initialBenchmarkDateFrom);
  const [benchmarkDateTo, setBenchmarkDateTo] = useState<string>(initialBenchmarkDateTo);
  const [currency, setCurrency] = useState<string>(initialCurrency);
  const [fields, setFields] = useState<string[]>(initialFields);
  const [transactionType, setTransactionType] = useState<string[]>(initialTransactionType);
  const [amounts, setAmounts] = useState<string[]>(initialAmounts);
  const [ODconcept, setODconcept] = useState<string>(initialODconcept);
  const [ODfiltering, setODfiltering] = useState<string>(initialODfiltering);
  const [isCustomSqlActive, setIsCustomSqlActive] = useState<boolean>(initialIsCustomSqlActive);
  const [selectedGroupingAgency, setSelectedGroupingAgency] = useState<string>(initialSelectedGroupingAgency);
  const [selectedGroupingGeoFrom, setSelectedGroupingGeoFrom] = useState<string>(initialSelectedGroupingGeoFrom);
  const [selectedGroupingGeoTo, setSelectedGroupingGeoTo] = useState<string>(initialSelectedGroupingGeoTo);
  const [selectedGroupingIssuing, setSelectedGroupingIssuing] = useState<string>(initialSelectedGroupingIssuing);
  const [selectedGroupingMarketing, setSelectedGroupingMarketing] = useState<string>(initialSelectedGroupingMarketing);
  const [selectedGroupingOperating, setSelectedGroupingOperating] = useState<string>(initialSelectedGroupingOperating);
  const [selectedGroupingValuesAgency, setSelectedGroupingValuesAgency] = useState<string[]>(initialSelectedGroupingValuesAgency);
  const [selectedGroupingValuesGeoFrom, setSelectedGroupingValuesGeoFrom] = useState<string[]>(initialSelectedGroupingValuesGeoFrom);
  const [selectedGroupingValuesGeoTo, setSelectedGroupingValuesGeoTo] = useState<string[]>(initialSelectedGroupingValuesGeoTo);
  const [selectedGroupingValuesIssuing, setSelectedGroupingValuesIssuing] = useState<string[]>(initialSelectedGroupingValuesIssuing);
  const [selectedGroupingValuesMarketing, setSelectedGroupingValuesMarketing] = useState<string[]>(initialSelectedGroupingValuesMarketing);
  const [selectedGroupingValuesOperating, setSelectedGroupingValuesOperating] = useState<string[]>(initialSelectedGroupingValuesOperating);
  const [sqlCode, setSqlCode] = useState<string>(initialSqlCode);
  
  const addTag = (field: string) => {
    if (!fields.includes(field)) {
      setFields([...fields, field]);
    }
  };

  const removeField = (field: string) => {
    setFields(fields.filter((t) => t !== field));
  };

  const filteredFields = availableFields.filter((field) =>
    field.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const { accountid } = useAccount();
  //SAVE BUTTON HANDLE SAVE BEGIN
  const handleSave = async () => {
    const reportData = {
      // Consolidate all the necessary data from LayoutRightPurplePanel, LayoutMainInfoForm, and Tabs
      // Example:
      
      accountid,
      reportid,
      reportName,
      description,
      tags,
      dateConcept,
      dateFrom,
      dateTo,
      benchmarkPeriod,
      benchmarkDateFrom,
      benchmarkDateTo,
      currency,
      fields,
      transactionType,
      amounts,
      selectedGroupingValuesAgency,
      selectedGroupingAgency,
      selectedGroupingValuesIssuing,
      selectedGroupingIssuing,
      selectedGroupingValuesMarketing,
      selectedGroupingMarketing,
      selectedGroupingValuesOperating,
      selectedGroupingOperating,
      selectedGroupingValuesGeoFrom,
      selectedGroupingGeoFrom, selectedGroupingValuesGeoTo,
      selectedGroupingGeoTo,
      ODconcept,
      ODfiltering,
      sqlCode,
      isCustomSqlActive,
      status: 'draft' 

      // Add other necessary state or props here
    };

    try {
      const response = await fetch('/api/home_account/reportdesign/saveReport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportData }),
      });

      if (!response.ok) {
        throw new Error('Failed to save report');
      }

      const result = await response.json();
      setPopupMessage(result.message);
      setTimeout(() => setPopupMessage(null), 3000);
    } catch (error) {
      console.error('Error saving report:', error);
      setPopupMessage('Failed to save report');
      setTimeout(() => setPopupMessage(null), 3000);
    }
  };
  //SAVE BUTTON HANDLE SAVE END

  // START HANDLE RUN REPORT

  const handleRun = async () => {
    const reportData = {
      // Consolidate all the necessary data from LayoutRightPurplePanel, LayoutMainInfoForm, and Tabs
      // Example:
      accountid,
      reportid,
      reportName,
      description,
      tags,
      dateConcept,
      dateFrom,
      dateTo,
      benchmarkPeriod,
      benchmarkDateFrom,
      benchmarkDateTo,
      currency,
      fields,
      transactionType,
      amounts,
      selectedGroupingValuesAgency,
      selectedGroupingAgency,
      selectedGroupingValuesIssuing,
      selectedGroupingIssuing,
      selectedGroupingValuesMarketing,
      selectedGroupingMarketing,
      selectedGroupingValuesOperating,
      selectedGroupingOperating,
      selectedGroupingValuesGeoFrom,
      selectedGroupingGeoFrom,
      selectedGroupingValuesGeoTo,
      selectedGroupingGeoTo,
      ODconcept,
      ODfiltering,
      sqlCode,
      isCustomSqlActive,
      status: 'running' // Set status to 'result'
      // Add other necessary state or props here
    };
  
    try {
      const response = await fetch('/api/home_account/reportdesign/runReport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportData }),
      });

      if (!response.ok) {
        throw new Error('Failed to run report');
      }

      const result = await response.json();
      const { reportId } = result;

      // Trigger the generateExcel API
      const excelResponse = await fetch('/api/home_account/reportdesign/generateExcel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportData, reportId }),
      });

      if (!excelResponse.ok) {
        throw new Error('Failed to generate Excel file');
      }

      const excelResult = await excelResponse.json();
      setPopupMessage(excelResult.message);
      setTimeout(() => setPopupMessage(null), 3000);
    } catch (error) {
      console.error('Error running report:', error);
      setPopupMessage('Failed to run report');
      setTimeout(() => setPopupMessage(null), 3000);
    }
  };


  // END HANDLE RUN REPORT

  return (
    <main className="z-20">
      <LayoutRightPurplePanel handleRun={handleRun}  handleSave={handleSave} fields={fields} removeField={removeField} />
      <div className="flex flex-col lg:mr-48 mr-44 ml-0 mt-0 h-full border-none marker:overflow-y-auto">
      <LayoutMainInfoForm 
         reportName={reportName}
         setReportName={setReportName}
         description={description}
         setDescription={setDescription}
         tags={tags}
         setTags={setTags}
         dateConcept={dateConcept}
         setDateConcept={setDateConcept}
         dateFrom={dateFrom}
         setDateFrom={setDateFrom}
         dateTo={dateTo}
         setDateTo={setDateTo}
         benchmarkPeriod={benchmarkPeriod}
         setBenchmarkPeriod={setBenchmarkPeriod}
         benchmarkDateFrom={benchmarkDateFrom}
         setBenchmarkDateFrom={setBenchmarkDateFrom}
         benchmarkDateTo={benchmarkDateTo}
         setBenchmarkDateTo={setBenchmarkDateTo}
         defaultDateConcept={dateConcept}
         defaultDateFrom={dateFrom}
         defaultDateTo={dateTo}
         defaultBenchmarkPeriod={benchmarkPeriod}
         defaultBenchmarkDateFrom={benchmarkDateFrom}
         defaultBenchmarkDateTo={benchmarkDateTo}
         />

      
        <Tabs defaultValue="main-options" className="w-full">
          <TabsList>
        <TabsTrigger value="main-options" onClick={() => setActiveTab(0)}>Main Options</TabsTrigger>
        <TabsTrigger value="field-selection" onClick={() => setActiveTab(1)}>Field Selection</TabsTrigger>
        <TabsTrigger value="filters" onClick={() => setActiveTab(2)}>Filters</TabsTrigger>
        <TabsTrigger value="custom-filters" onClick={() => setActiveTab(3)}>Custom Filters</TabsTrigger>
          </TabsList>
          <TabsContent value="main-options">
        {activeTab === 0 && (
          <div className="p-4 bg-white rounded-lg">
                  <MainOptionsForm
                  currency={currency}
                  setCurrency={setCurrency}
                  selectedTransactionTypes={transactionType}
                  setSelectedTransactionTypes={setTransactionType}
                  selectedAmounts={amounts}
                  setSelectedAmounts={setAmounts}
                />
                </div>
        )}
          </TabsContent>
          <TabsContent value="field-selection">
        {activeTab === 1 && (
          <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="bg-white rounded-lg">
          <div className="flex flex-row rounded-md p-4 justify-start text-xl font-bold space-x-6">Field Selection</div>
          <div className="relative pr-6 pl-6 flex flex-1 flex-shrink-0">
            <input
              type="text"
              placeholder="Click on fields below to include them on the report Group By. Type here to search fields..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <MagnifyingGlassIcon className="absolute left-8 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <FieldButtons addTag={addTag} fields={filteredFields} selectedFields={fields} />
            </div>
          </div>
        )}
          </TabsContent>
          <TabsContent value="filters">
        {activeTab === 2 && (
          <div className="p-4 bg-white rounded-lg shadow-md">
            <FilterForm 
                selectedGroupingAgency={selectedGroupingAgency}
                setSelectedGroupingAgency={setSelectedGroupingAgency}
                selectedGroupingValuesAgency={selectedGroupingValuesAgency}
                setSelectedGroupingValuesAgency={setSelectedGroupingValuesAgency}
                isDropdownOpenAgency={isDropdownOpenAgency}
                toggleDropdownAgency={toggleDropdownAgency}

                selectedGroupingIssuing={selectedGroupingIssuing}
                setSelectedGroupingIssuing={setSelectedGroupingIssuing}
                selectedGroupingValuesIssuing={selectedGroupingValuesIssuing}
                setSelectedGroupingValuesIssuing={setSelectedGroupingValuesIssuing}
                isDropdownOpenIssuing={isDropdownOpenIssuing}
                toggleDropdownIssuing={toggleDropdownIssuing}

                selectedGroupingMarketing={selectedGroupingMarketing}
                setSelectedGroupingMarketing={setSelectedGroupingMarketing}
                selectedGroupingValuesMarketing={selectedGroupingValuesMarketing}
                setSelectedGroupingValuesMarketing={setSelectedGroupingValuesMarketing}
                isDropdownOpenMarketing={isDropdownOpenMarketing}
                toggleDropdownMarketing={toggleDropdownMarketing}

                selectedGroupingOperating={selectedGroupingOperating}
                setSelectedGroupingOperating={setSelectedGroupingOperating}
                selectedGroupingValuesOperating={selectedGroupingValuesOperating}
                setSelectedGroupingValuesOperating={setSelectedGroupingValuesOperating}
                isDropdownOpenOperating={isDropdownOpenOperating}
                toggleDropdownOperating={toggleDropdownOperating}

                selectedGroupingGeoFrom={selectedGroupingGeoFrom}
                setSelectedGroupingGeoFrom={setSelectedGroupingGeoFrom}
                selectedGroupingValuesGeoFrom={selectedGroupingValuesGeoFrom}
                setSelectedGroupingValuesGeoFrom={setSelectedGroupingValuesGeoFrom}
                isDropdownOpenGeoFrom={isDropdownOpenGeoFrom}
                toggleDropdownGeoFrom={toggleDropdownGeoFrom}

                selectedGroupingGeoTo={selectedGroupingGeoTo}
                setSelectedGroupingGeoTo={setSelectedGroupingGeoTo}
                selectedGroupingValuesGeoTo={selectedGroupingValuesGeoTo}
                setSelectedGroupingValuesGeoTo={setSelectedGroupingValuesGeoTo}
                isDropdownOpenGeoTo={isDropdownOpenGeoTo}
                toggleDropdownGeoTo={toggleDropdownGeoTo}

                ODconcept={ODconcept}
                setODconcept={setODconcept}
                ODfiltering={ODfiltering}
                setODfiltering={setODfiltering}
            />
          </div>
        )}
          </TabsContent>
          <TabsContent value="custom-filters">
        {activeTab === 3 && (
          <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex flex-col w-full p-6 items-center bg-white rounded space-y-4">
          <ToggleSwitchCustomSql isCustomSqlActive={isCustomSqlActive} setIsCustomSqlActive={setIsCustomSqlActive} />
            </div>
            <TextBoxSQL sqlCode={sqlCode} setSqlCode={setSqlCode}/>
          </div>
        )}
          </TabsContent>
        </Tabs>
      </div>
      {popupMessage && (
        <PopupNotification
          message={popupMessage}
        />
      )}
    </main>
  );
};

export default CreateFormLayout;
