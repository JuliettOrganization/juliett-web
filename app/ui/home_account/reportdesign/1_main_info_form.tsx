'use client';
import React from 'react';
import TagInput from '@/app/ui/home_account/reportdesign/1_TagInput';

export default function Form() {
  return (
    <div className="p-4">
      <div className="rounded-md  border-none bg-white p-4">
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
                type="string"
                placeholder="Type here"
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
                id="Description"
                name="Description"
                type="string"
                placeholder="Type here"
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
              <TagInput />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mt-6">
          {/* Date Concept */}
          <div className="mb-4">
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
    </div>
  );
}
