'use client';

import React, { useState, useEffect } from 'react';
import { useAccount } from '@/app/context/AccountContext';
import LoadingSpinner from '@/app/ui/LoadingSpinner';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface YearData {
  months: {
    [key: string]: number[];
  };
}

interface CountryData {
  country: string;
  years: {
    [key: string]: YearData;
  };
}

const LoadingPage = () => {
  const { accountid } = useAccount();
  const [countriesData, setCountriesData] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [countrySearchTerm, setCountrySearchTerm] = useState('');
  const [monthSearchTerm, setMonthSearchTerm] = useState('');
  const [expandedYears, setExpandedYears] = useState<{ [key: string]: boolean }>({});
  const [allExpanded, setAllExpanded] = useState(false);

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const response = await fetch(`/api/home_account/loadingStatus?accountid=${accountid}`);
        if (response.ok) {
          const data = await response.json();
          setCountriesData(data);
        } else {
          console.error('Error fetching countries data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching countries data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountriesData();
  }, [accountid]);

  const filteredCountriesData = countriesData.filter((countryData) =>
    countryData.country.toLowerCase().includes(countrySearchTerm.toLowerCase())
  ).map((countryData) => {
    const filteredYears = Object.entries(countryData.years).reduce((acc, [year, yearData]) => {
      const filteredMonths = Object.entries(yearData.months).reduce((monthAcc, [month, loadedDays]) => {
        if (month.toLowerCase().includes(monthSearchTerm.toLowerCase())) {
          monthAcc[month] = loadedDays;
        }
        return monthAcc;
      }, {} as { [key: string]: number[] });

      if (Object.keys(filteredMonths).length > 0) {
        acc[year] = { months: filteredMonths };
      }
      return acc;
    }, {} as { [key: string]: YearData });

    return {
      ...countryData,
      years: filteredYears,
    };
  }).filter((countryData) =>
    Object.keys(countryData.years).some((year) =>
      Object.keys(countryData.years[year].months).length > 0
    )
  );

  const monthNames = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  const getAllDaysInMonth = (year: number, month: keyof typeof monthNames) => {
    const monthIndex = monthNames[month];
    const date = new Date(year, monthIndex, 1);
    const days = [];
    while (date.getMonth() === monthIndex) {
      days.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const toggleYear = (year: string) => {
    setExpandedYears((prev) => ({
      ...prev,
      [year]: !prev[year],
    }));
  };

  const toggleAllYears = () => {
      const newExpandedState = !allExpanded;
      const newExpandedYears = filteredCountriesData.reduce((acc, countryData) => {
        Object.keys(countryData.years).forEach((year) => {
          acc[year] = newExpandedState;
        });
        return acc;
      }, {} as { [key: string]: boolean });
  
      setExpandedYears(newExpandedYears);
      setAllExpanded(newExpandedState);
    };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col m-2 justify-start">
      <div className="flex flex-col mb-8">
        <h1 className="mb-4 text-4xl">Loading Status</h1>
        <p className="text-lg text-gray-500">Check the loading status for each country available in your account.</p>
      </div>
      <div className="grid grid-cols-8 md:grid-cols-9 gap-2 w-full mb-4">
        <div className="col-span-4 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /><input
          type="text"
          placeholder="Search a country..."
          value={countrySearchTerm}
          onChange={(e) => setCountrySearchTerm(e.target.value)}
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        /> 
</div>
<div className="col-span-4 relative">
  <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
  <input
    type="text"
    placeholder="Search a month..."
    value={monthSearchTerm}
    onChange={(e) => setMonthSearchTerm(e.target.value)}
    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
  />
</div>
        <button
          onClick={toggleAllYears}
          className="text-white rounded-lg p-1 cursor-pointer bg-black hover:bg-gray-500"
        >
          {allExpanded ? 'Collapse Years' : 'Expand Years'}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {filteredCountriesData.map((countryData, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">{countryData.country}</h2>
            {Object.entries(countryData.years).map(([year, yearData]) => (
              <div key={year} className="mb-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold mb-2 text-gray-500">{year}</h3>
                  <button
                    onClick={() => toggleYear(year)}
                    className="text-white p-2 text-xs cursor-pointer rounded-lg bg-black hover:bg-gray-500"
                  >
                    {expandedYears[year] ? 'Collapse' : 'Expand'}
                  </button>
                </div>
                {expandedYears[year] && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(yearData.months).map(([month, loadedDays]) => (
                      <div key={month} className="bg-white p-2 rounded-lg shadow">
                        <h4 className="text-lg font-medium mb-2">{month}</h4>
                        <div className="flex flex-wrap">
                          {getAllDaysInMonth(parseInt(year), month as keyof typeof monthNames).map((day) => (
                            <span
                              key={day}
                              className={`rounded-full w-4 h-4 flex items-center justify-center m-0.5 text-[10px] ${
                              loadedDays.includes(day) ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                              }`}
                            >
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingPage;