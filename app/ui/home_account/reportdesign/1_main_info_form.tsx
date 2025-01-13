'use client';
import React from 'react';
import TagInput from '@/app/ui/home_account/reportdesign/1_TagInput';

interface ReportMainInfoProps {
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

const ReportMainInfo: React.FC<ReportMainInfoProps> = ({
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
  const isBenchmarkDisabled = benchmarkPeriod === 'No';

  return (
    <div className="p-4">
      <div className="rounded-md border-none bg-white p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Report Name */}
          <div className="mb-4">
            <label htmlFor="report_name" className="mb-2 block text-sm font-medium">
              Report Name
            </label>
            <div className="relative mt-2 rounded-md">
              <input
                id="report_name"
                name="report_name"
                type="text"
                placeholder="Type here"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="mb-2 block text-sm font-medium">
              Description
            </label>
            <div className="relative mt-2 rounded-md">
              <input
                id="description"
                name="description"
                type="text"
                placeholder="Type here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="mb-4 md:col-span-2 lg:col-span-2">
            <label htmlFor="tags" className="mb-2 block text-sm font-medium">
              Tags
            </label>            
            <div className="relative mt-2 rounded-md border border-gray-200 bg-white px-[14px] pl-0 py-0 items-center gap-4">
            <TagInput tags={tags} setTags={setTags} />
            </div>
            </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mt-6">
          {/* Date Concept */}
          <div className="mb-4">
            <label htmlFor="date_concept" className="mb-2 block text-sm font-medium w-40">
              Date Concept
            </label>
            <div className="relative">
            <select
                id="date_concept"
                name="date_concept"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 bg-white"
                value={dateConcept || defaultDateConcept}
                onChange={(e) => setDateConcept(e.target.value)}
              >
                <option value="Issue Date" className="bg-white text-black">Issue Date</option>
                <option value="Travel Date" className="bg-white text-black">Travel Date</option>
                <option value="Reporting Date" className="bg-white text-black">Reporting Date</option>
              </select>
                          </div>
          </div>

          {/* Date From */}
          <div className="mb-4">
            <label htmlFor="date_from" className="mb-2 block text-sm font-medium">
              Date From
            </label>
            <div className="relative">
              <input
                id="date_from"
                name="date_from"
                type="date"
                value={dateFrom || defaultDateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Date To */}
          <div className="mb-4">
            <label htmlFor="date_to" className="mb-2 block text-sm font-medium">
              Date To
            </label>
            <div className="relative">
              <input
                id="date_to"
                name="date_to"
                type="date"
                value={dateTo || defaultDateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Benchmark Period */}
          <div className="mb-4">
            <label htmlFor="benchmark_period" className="mb-2 block text-sm font-medium w-40">
              Benchmark Period
            </label>
            <div className="relative">
            <select
                id="benchmark_period"
                name="benchmark_period"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 bg-white"
                value={benchmarkPeriod || defaultBenchmarkPeriod}
                onChange={(e) => setBenchmarkPeriod(e.target.value)}
              >
                <option value="Yes" className="bg-white text-black">Yes</option>
                <option value="No" className="bg-white text-black">No</option>
              </select>
            </div>
          </div>

          {/* Benchmark Date From */}
          <div className="mb-4">
            <label htmlFor="benchmark_date_from" className="mb-2 block text-sm font-medium">
              Benchmark Date From
            </label>
            <div className="relative">
              <input
                id="benchmark_date_from"
                name="benchmark_date_from"
                type="date"
                value={benchmarkDateFrom || defaultBenchmarkDateFrom}
                onChange={(e) => setBenchmarkDateFrom(e.target.value)}
                className={`peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 ${isBenchmarkDisabled ? 'text-gray-400' : ''}`}
                disabled={isBenchmarkDisabled}               />
            </div>
          </div>

          {/* Benchmark Date To */}
          <div className="mb-4">
            <label htmlFor="benchmark_date_to" className="mb-2 block text-sm font-medium">
              Benchmark Date To
            </label>
            <div className="relative">
              <input
                id="benchmark_date_to"
                name="benchmark_date_to"
                type="date"
                value={benchmarkDateTo || defaultBenchmarkDateTo}
                onChange={(e) => setBenchmarkDateTo(e.target.value)}
                className={`peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 ${isBenchmarkDisabled ? 'text-gray-400' : ''}`}
                disabled={isBenchmarkDisabled}                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportMainInfo;