'use client';
import React from 'react';
import TagInput from '@/app/ui/home_account/reportdesign/1_TagInput';

export default function Form() {
  // Specify the type of the event parameter
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); };
 
  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md border-none bg-white">
        <div className="flex flex-row rounded-md bg-white pt-4 pr-4 pl-6 pb-1 space-x-6">
          {/* Report Name */}
          <div className="mb-4 w-[250px]">
            <label htmlFor="report_name" className="mb-2 block text-sm font-medium">
              Report Name
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="report_name"
                  name="report_name"
                  type="string"
                  placeholder="Type here"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-4 w-[250px]">
            <label htmlFor="description" className="mb-2 block text-sm font-medium">
              Description
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="Description"
                  name="Description"
                  type="string"
                  placeholder="Type here"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-4">
            <label htmlFor="tags" className="mb-2 block text-sm font-medium">
              Tags
            </label>
            <div className="flex flex-grow rounded-md border border-gray-200 bg-white px-[14px] pl-0 py-0 items-center gap-4">
              <TagInput />
            </div>
          </div>
        </div>
     
        <div className="flex flex-row flex-nowrap pt-0 pr-4 pl-6 pb-4 rounded-md bg-white space-x-6">
          {/* Date Concept */}
          <div className="mb-4 flex-nowrap">
            <label htmlFor="DateConcept" className="mb-2 block text-sm font-medium w-40">
              Date Concept
            </label>
            <div className="relative">
              <select
                id="DateConcept"
                name="DateConcept"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                defaultValue="Issue Date"
              >
                <option value="Option1">Issue Date</option>
                <option value="Option2">Travel Date</option>
                <option value="Option3">Reporting Date</option>
              </select>
            </div>
          </div>
          
          {/* Date from */}
          <div className="mb-4">
            <label htmlFor="DateFrom" className="mb-2 block text-sm font-medium">
              Date From
            </label>
            <div className="relative">
              <input
                id="DateFrom"
                name="DateFrom"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                type="date"
                defaultValue="2025-01-01"
              />
            </div>
          </div>

          {/* Date to */}
          <div className="mb-4">
            <label htmlFor="DateTo" className="mb-2 block text-sm font-medium">
              Date To
            </label>
            <div className="relative">
              <input
                id="DateTo"
                name="DateTo"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                type="date"
                defaultValue="2025-01-31"
              />
            </div>
          </div>

          {/* Benchmark Period */}
          <div className="mb-4">
            <label htmlFor="BenchmarkPeriod" className="mb-2 block text-sm font-medium w-40">
              Benchmark Period
            </label>
            <div className="relative">
              <select
                id="BenchmarkPeriod"
                name="BenchmarkPeriod"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                defaultValue="No"
              >
                <option value="Option1">Yes</option>
                <option value="Option2">No</option>
              </select>
            </div>
          </div>

          {/* Date from benchmark */}
          <div className="mb-4">
            <label htmlFor="DateFromBenchmark" className="mb-2 block text-sm font-medium">
              Date From
            </label>
            <div className="relative">
              <input
                id="DateFromBenchmark"
                name="DateFromBenchmark"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                type="date"
                defaultValue="2024-01-01"
              />
            </div>
          </div>

          {/* Date to benchmark */}
          <div className="mb-4">
            <label htmlFor="DateToBenchmark" className="mb-2 block text-sm font-medium">
              Date To
            </label>
            <div className="relative">
              <input
                id="DateToBenchmark"
                name="DateToBenchmark"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                type="date"
                defaultValue="2024-01-31"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
