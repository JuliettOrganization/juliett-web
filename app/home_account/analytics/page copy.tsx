'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAccount } from '@/app/context/AccountContext';
import { Line, Pie, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, BarChart3Icon } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

const AnalyticsPage = () => {
  const { accountid } = useAccount();
  const [selectedReport, setSelectedReport] = useState('');
  const [selectedReportid, setSelectedReportid] = useState('');

  const [reportInfo, setReportInfo] = useState<any>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedKPI, setSelectedKPI] = useState('Total Gross (USD)');
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (selectedReportid) {
      fetchReportInfo();
    }
  }, [selectedReportid]);

  const fetchReportInfo = async () => {
    try {
      const response = await fetch(`/api/home_account/analytics/fetchSelectedReportInfo?accountid=${accountid}&reportid=${selectedReportid}`);
      if (!response.ok) {
        throw new Error('Failed to fetch report info');
      }
      const data = await response.json();
      setReportInfo(data);
    } catch (error) {
      console.error('Error fetching report info:', error);
    }
  };

  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const debounceFetchReports = useCallback(
    debounce(async (query: string) => {
      try {
        const response = await fetch(`/api/home_account/analytics/fetchReportList?accountid=${accountid}&query=${query}`);
        const data = await response.json();
        setReportOptions(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    }, 1000),
    [accountid]
  );

  interface Report {
    reportid: string;
    reportname: string;
    updated: string;
  }

  const [reportOptions, setReportOptions] = useState<Report[]>([]);

  const kpiData = [
    { title: `Total Gross (${reportInfo ? reportInfo[0].currency : 'USD'})`, value: '1,000,000', yoy: '+10%' },
    { title: 'Total Coupon Count', value: '500', yoy: '+5%' },
    { title: 'Total Ticket Count', value: '450', yoy: '+7%' },
    { title: `Average Fare (${reportInfo ? reportInfo[0].currency : 'USD'})`, value: '2,222', yoy: '+3%' },
  ];

  const monthlyTimeSeriesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: selectedKPI,
        data: [120, 190, 300, 500, 200, 300, 400, 500, 600, 700, 800, 900],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };
  const dailyTimeSeriesData = {
    labels: Array.from({ length: 365 }, (_, i) => new Date(2023, 0, i + 1).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    datasets: [
      {
        label: selectedKPI,
        data: Array.from({ length: 365 }, () => Math.floor(Math.random() * 1000)),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const weeklyTimeSeriesData = {
    labels: Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`),
    datasets: [
      {
        label: selectedKPI,
        data: Array.from({ length: 52 }, () => Math.floor(Math.random() * 1000)),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const pieData = {
    labels: ['Airline A', 'Airline B', 'Airline C'],
    datasets: [
      {
        data: [300, 500, 200],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const barData = {
    labels: ['Agency A', 'Agency B', 'Agency C'],
    datasets: [
      {
        label: 'Total Gross (USD)',
        data: [400, 300, 500],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-gray-300 min-h-screen p-4">
      <div className="flex flex-row w-full items-center space-x-4 justify-between">
        <h1 className="text-4xl mb-4">Analytics</h1>
        <div className="flex bg-gray-200 p-2 m-0 rounded-lg mb-4 items-center overflow-x-auto">
          <div className="flex flex-row space-x-8 items-center">
            {/* Report Select */}
            <div className="flex flex-row space-x-2 items-center">
              <label htmlFor="report" className="flex text-sm font-medium items-center justify-center">
                Report
              </label>
              <div className="relative">  
                <input
                  type="text"
                  value={selectedReport}
                  onChange={(e) => {
                    const query = e.target.value;
                    setSelectedReport(query);
                    if (query.length > 0) {
                      debounceFetchReports(query);
                    } else {
                      setReportOptions([]);
                    }
                  }}
                  className="peer block max-w-72 rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                  placeholder="Search for a report"
                />
                {reportOptions?.length > 0 && (
                  <div className="fixed bg-white border border-gray-200 rounded-md mt-1 max-h-60 overflow-auto z-50">
                    {reportOptions.map((report) => (
                      <div
                        key={report.reportid}
                        onClick={() => {
                          setSelectedReport(report.reportname);
                          setSelectedReportid(report.reportid);
                          setReportOptions([]);
                        }}
                        className="cursor-pointer text-xs p-2 hover:bg-gray-100 flex justify-between"
                      >
                        <span>{report.reportname}</span>
                        <span className="text-gray-500 pl-2">{new Date(report.updated).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Date From */}
            <div className="flex flex-row space-x-2 items-center">
              <label htmlFor="date_from" className="block text-sm font-medium">
                Date From
              </label>
                <div className="relative">
                <input
                  type="date"
                  value={startDate ? startDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                />
                </div>
            </div>
            {/* Date To */}
            <div className="flex flex-row space-x-2 items-center">
              <label htmlFor="date_to" className="block text-sm font-medium">
                Date To
              </label>
                <div className="relative">
                <input
                  type="date"
                  value={endDate ? endDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                />
                </div>
            </div>
            <div className="flex flex-row rounded-lg space-x-2 p-2 items-center justify-end">
              <label htmlFor="report" className="flex text-sm font-medium items-center justify-center">
                Select KPI
              </label>
              <div className="relative">
                <select
                  value={selectedKPI}
                  onChange={(e) => setSelectedKPI(e.target.value)}
                  className="peer block rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                >
                    <option value={`Total Gross (${reportInfo ? reportInfo[0].currency : 'USD'})`}>Total Gross ({reportInfo ? reportInfo[0].currency : 'USD'})</option>
                  <option value="Total Coupon Count">Total Coupon Count</option>
                  <option value="Total Ticket Count">Total Ticket Count</option>
                    <option value={`Average Fare (${reportInfo ? reportInfo[0].currency : 'USD'})`}>Average Fare ({reportInfo ? reportInfo[0].currency : 'USD'})</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white p-4 rounded-lg">
            <h2 className="text-lg font-bold">{kpi.title}</h2>
            <p className="text-2xl">{kpi.value}</p>
            <p className="text-green-500">{kpi.yoy}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <div className="col-span-4 bg-white p-4 rounded-lg mb-4">
          <Tabs defaultValue="main-options" className="w-full">
            <TabsList>
              <TabsTrigger value="Day" onClick={() => setActiveTab(0)}>Day</TabsTrigger>
              <TabsTrigger value="Week" onClick={() => setActiveTab(1)}>Week</TabsTrigger>
              <TabsTrigger value="Month" onClick={() => setActiveTab(2)}>Month</TabsTrigger>
            </TabsList>
            <TabsContent value="Day">
              {activeTab === 0 && (
                <div className="justify-center">
                  <Line
                  data={dailyTimeSeriesData}
                  options={{
                    elements: {
                    line: {
                      borderWidth: 1, // Make the line thinner
                    },
                    point: {
                      radius: 0, // Remove the circles on the points
                    },
                    },
                    scales: {
                    y: {
                      title: {
                      display: true,
                      text: selectedKPI,
                      },
                    },
                    x: {
                      title: {
                      display: true,
                      text: reportInfo ? reportInfo[0].date_concept : '',
                      },
                    },
                    },
                  }}
                  />
                </div>
              )}
            </TabsContent>
            <TabsContent value="Week">
              {activeTab === 1 && (
                <div className="justify-center">
                  <Line
                    data={weeklyTimeSeriesData}
                    options={{
                      scales: {
                        y: {
                          title: {
                            display: true,
                            text: selectedKPI,
                          },
                        },
                        x: {
                          title: {
                            display: true,
                            text: reportInfo ? reportInfo[0].date_concept : '',                          },
                        },
                      },
                    }}
                  />
                </div>
              )}
            </TabsContent>
            <TabsContent value="Month">
              {activeTab === 2 && (
                <div className="justify-center">
                  <Bar
                    data={monthlyTimeSeriesData}
                    options={{
                      scales: {
                        y: {
                          title: {
                            display: true,
                            text: selectedKPI,
                          },
                        },
                        x: {
                          title: {
                            display: true,
                            text: reportInfo ? reportInfo[0].date_concept : '',                          },
                        },
                      },
                    }}
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        <div className="col-span-3 bg-white p-4 rounded-lg mb-4 flex flex-col justify-center overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">Report Main Conditions</h2>
          <ul className="space-y-0 py-2">
            {reportInfo && (
              <>
              {reportInfo[0].tags.length > 0 && (
                <li className="text-xs flex flex-col justify-center">
                <div className="flex justify-start border-t py-2 border-gray-200">
                  <strong>Tags:&nbsp;</strong>
                  <span>{reportInfo[0].tags.join(' | ')}</span>
                </div>
          
                </li>
              )}
              <li className="text-xs flex flex-col justify-center">
                <div className="flex justify-start border-t py-2 border-gray-200">
                <strong>Date Concept:&nbsp;</strong>
                <span>{reportInfo[0].date_concept}</span>
                </div>
      
              </li>
             <li className="text-xs flex flex-col justify-center">
                <div className="flex justify-start border-t py-2 border-gray-200">
                  <strong>Benchmark Period:&nbsp;</strong>
                  <span>
                    {reportInfo[0].benchmark_period == 'Yes' ? (
                      <>
                        {reportInfo[0].benchmark_date_from} <strong>&rarr;</strong> {reportInfo[0].benchmark_date_to}
                      </>
                    ) : (
                      'Last Year'
                    )}
                  </span>
                  </div>
                </li>
              {reportInfo[0].selected_grouping_values_agency.length > 0 && (
              <li className="text-xs flex flex-col justify-center">
                <div className="flex justify-start border-t py-2 border-gray-200">
                  <strong>Agency Filter:&nbsp;</strong>
                  <span>{reportInfo[0].selected_grouping_agency} <strong>&rarr;</strong> {reportInfo[0].selected_grouping_values_agency.join(', ')}</span>
                </div>
                </li>
              )}
              {reportInfo[0].selected_grouping_values_issuing.length > 0 && (
              <li className="text-xs flex flex-col justify-center">
                <div className="flex justify-start border-t py-2 border-gray-200">
                  <strong>Airline Issuing:&nbsp;</strong>
                  <span>{reportInfo[0].selected_grouping_issuing} <strong>&rarr;</strong> {reportInfo[0].selected_grouping_values_issuing.join(', ')}</span>
                </div>
                </li>
              )}
              {reportInfo[0].selected_grouping_values_marketing.length > 0 && (
               <li className="text-xs flex flex-col justify-center">
                <div className="flex justify-start border-t py-2 border-gray-200">
                  <strong>Airline Marketing:&nbsp;</strong>
                  <span>{reportInfo[0].selected_grouping_marketing} <strong>&rarr;</strong> {reportInfo[0].selected_grouping_values_marketing.join(', ')}</span>
                </div>
                </li>
              )}
              {reportInfo[0].selected_grouping_values_operating.length > 0 && (
              <li className="text-xs flex flex-col justify-center">
                <div className="flex justify-start border-t py-2 border-gray-200">
                  <strong>Airline Operating:&nbsp;</strong>
                  <span>{reportInfo[0].selected_grouping_operating} <strong>&rarr;</strong> {reportInfo[0].selected_grouping_values_operating.join(', ')}</span>
                </div>
                </li>
              )}
              {reportInfo[0].selected_grouping_values_geo_from.length > 0 && (
              <li className="text-xs flex flex-col justify-center">
                <div className="flex justify-start border-t py-2 border-gray-200">
                  <strong>Geo From Filters:&nbsp;</strong>
                  <span>{reportInfo[0].selected_grouping_values_geo_from.join(', ')}</span>
                </div>
                </li>
              )}
              {reportInfo[0].selected_grouping_values_geo_to.length > 0 && (
             <li className="text-xs flex flex-col justify-center">
                <div className="flex justify-start border-t py-2 border-gray-200">
                  <strong>Geo To Filters:&nbsp;</strong>
                  <span>{reportInfo[0].selected_grouping_values_geo_to.join(', ')}</span>
                </div>
                </li>
              )}
              {(reportInfo[0].selected_grouping_values_geo_to.length > 0 || reportInfo[0].selected_grouping_values_geo_from.length > 0) && (
               <li className="text-xs flex flex-col justify-center">
                <div className="flex justify-start border-t py-2 border-gray-200">
                  <strong>Geo Filtering Concept:&nbsp;</strong>
                  <span>{reportInfo[0].od_concept}</span>
                </div>
                <div className="flex justify-start border-t py-2 border-gray-200">
                  <strong>Geo Filtering type:&nbsp;</strong>
                  <span>{reportInfo[0].od_filtering}</span>
                </div>
                </li>
              )}
                   <li className="text-xs flex flex-col justify-center">
                   <div className="flex justify-start border-t py-2 border-gray-200">
                        <strong>Transaction Type:&nbsp;</strong>
                      <span>{reportInfo[0].transaction_type && reportInfo[0].transaction_type.length > 0 ? reportInfo[0].transaction_type.join(', ') : 'all'}</span>
                    </div>
                    </li>
             
                {reportInfo[0].is_custom_sql_active == '1' && (
                <li className="text-xs flex flex-col justify-center">
                <div className="flex justify-start border-t py-2 border-gray-200">
                    <strong>Custom Filter:&nbsp;</strong> 
                    <span>{reportInfo[0].sql_code}</span> 
                    </div>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Airline wise {selectedKPI}</h2>
            <Doughnut 
            data={{
              ...pieData,
              datasets: [
              {
              ...pieData.datasets[0],
              backgroundColor: [
                'rgba(128, 0, 128, 0.6)', 'rgba(0, 255, 255, 0.6)', 'rgba(0, 0, 255, 0.6)', 
              'rgba(0, 128, 0, 0.6)', 'rgba(0, 255, 0, 0.6)', 'rgba(0, 0, 128, 0.6)', 
              'rgba(0, 128, 128, 0.6)', 'rgba(128, 0, 128, 0.6)', 'rgba(0, 255, 255, 0.6)', 
              'rgba(0, 0, 255, 0.6)', 'rgba(0, 128, 0, 0.6)', 'rgba(0, 255, 0, 0.6)', 'rgba(255, 205, 86, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 
              'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 
              'rgba(255, 159, 64, 0.6)', 'rgba(201, 203, 207, 0.6)', 'rgba(255, 205, 86, 0.6)', 
              'rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)', 
              'rgba(255, 159, 64, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(201, 203, 207, 0.6)', 
              'rgba(128, 0, 128, 0.6)', 'rgba(0, 255, 255, 0.6)', 'rgba(0, 0, 255, 0.6)', 
              'rgba(0, 128, 0, 0.6)', 'rgba(0, 255, 0, 0.6)', 'rgba(0, 0, 128, 0.6)', 
              'rgba(0, 128, 128, 0.6)', 'rgba(128, 0, 128, 0.6)', 'rgba(0, 255, 255, 0.6)', 
              'rgba(0, 0, 255, 0.6)', 'rgba(0, 128, 0, 0.6)', 'rgba(0, 255, 0, 0.6)', 
              ],
              },
              ],
            }} 
            options={{
              plugins: {
              tooltip: {
              callbacks: {
              label: function (context) {
                  const label = context.label || '';
                  const value = context.raw || '';
                  return `${label}: ${value}`;
                },
                },
              },
              },
            }}
            />
                 
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Cabin wise {selectedKPI}</h2>
          <Doughnut data={pieData} />
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Agency wise {selectedKPI}</h2>
          <Bar
            data={barData}
            options={{
              indexAxis: 'y',
              scales: {
                x: {
                  title: {
                    display: true,
                    text: selectedKPI,
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Agency',
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;