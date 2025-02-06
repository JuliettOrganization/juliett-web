// 1_layout_main_info_form.tsx
import React from 'react';
import ReportMainInfo from '@/app/home_account/reportdesign/ui/1_main_info_form';


interface LayoutMainInfoFormProps {
  reportName: string;
  setReportName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  tags: string[];
  setTags: (values: string[]) => void;
  dateConcept: string;
  setDateConcept: (value: string) => void;
  dateFrom: string;
  setDateFrom: (value: string) => void;
  dateTo: string;
  setDateTo: (value: string) => void;
  benchmarkPeriod: string;
  setBenchmarkPeriod: (value: string) => void;
  benchmarkDateFrom: string;
  setBenchmarkDateFrom: (value: string) => void;
  benchmarkDateTo: string;
  setBenchmarkDateTo: (value: string) => void;
  defaultDateConcept: string;
  defaultDateFrom: string;
  defaultDateTo: string;
  defaultBenchmarkPeriod: string;
  defaultBenchmarkDateFrom: string;
  defaultBenchmarkDateTo: string;
}


const LayoutMainInfoForm: React.FC<LayoutMainInfoFormProps> = ({
  reportName,
  setReportName,
  description,
  setDescription,
  tags,
  setTags,
  dateConcept,
  setDateConcept,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  benchmarkPeriod,
  setBenchmarkPeriod,
  benchmarkDateFrom,
  setBenchmarkDateFrom,
  benchmarkDateTo,
  setBenchmarkDateTo,
  defaultDateConcept,
  defaultDateFrom,
  defaultDateTo,
  defaultBenchmarkPeriod,
  defaultBenchmarkDateFrom,
  defaultBenchmarkDateTo,
}) => {
  return (
    <div className="flex flex-col mb-10 bg-white rounded-md border overflow-y-auto shadow-lg">
      <ReportMainInfo 
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
       defaultDateConcept={defaultDateConcept}
       defaultDateFrom={defaultDateFrom}
       defaultDateTo={defaultDateTo}
       defaultBenchmarkPeriod={defaultBenchmarkPeriod}
       defaultBenchmarkDateFrom={defaultBenchmarkDateFrom}
       defaultBenchmarkDateTo={defaultBenchmarkDateTo}/>
    </div>
  );
};

export default LayoutMainInfoForm;
