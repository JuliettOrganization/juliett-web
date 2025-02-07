"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAccount } from "@/app/context/AccountContext";
import KPIBox from "@/app/home_account/analytics/ui/KPIBox";
import ReportInfo from "@/app/home_account/analytics/ui/ReportInfo";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/home_account/reportdesign/ui/tabs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";
import { Line, Pie, Bar, Doughnut } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingSpinner from "@/app/ui_general/LoadingSpinner"; // Import the LoadingSpinner component
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
);

const AnalyticsPage = () => {
  const { accountid } = useAccount();
  const [selectedReport, setSelectedReport] = useState("");
  const [selectedReportid, setSelectedReportid] = useState("");
  const [reportInfo, setReportInfo] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedKPI, setSelectedKPI] = useState("Gross Amount");
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false); // State to manage loading spinner visibility

  useEffect(() => {
    if (selectedReportid) {
      fetchReportInfo();
    }
  }, [selectedReportid]);

  useEffect(() => {
    fetchChartData();
    setActiveTab(0);
  }, [selectedReportid, startDate, endDate]);

  const fetchReportInfo = async () => {
    if (!selectedReportid) return;
    setLoading(true); // Show loading spinner
    try {
      const response = await fetch(
        `/api/home_account/analytics/fetchSelectedReportInfo?accountid=${accountid}&reportid=${selectedReportid}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch report info");
      }
      const data = await response.json();
      setReportInfo(data);
      setStartDate(data[0].date_from ? new Date(data[0].date_from) : null);
      setEndDate(data[0].date_to ? new Date(data[0].date_to) : null);
    } catch (error) {
      console.error("Error fetching report info:", error);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  const fetchChartData = async () => {
    if (!selectedReportid || !startDate || !endDate) return;
    setLoading(true); // Show loading spinner
    try {
      const response = await fetch(
        `/api/home_account/analytics/fetchChartData?accountid=${accountid}&reportid=${selectedReportid}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch chart data");
      }
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    } finally {
      setLoading(false); // Hide loading spinner
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
        setLoading(true); // Show loading spinner

        const response = await fetch(
          `/api/home_account/analytics/fetchReportList?accountid=${accountid}&query=${query}`,
        );
        const data = await response.json();
        setReportOptions(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false); // Hide loading spinner
      }
    }, 1000),
    [accountid],
  );

  interface Report {
    reportid: string;
    reportname: string;
    updated: string;
  }

  const [reportOptions, setReportOptions] = useState<Report[]>([]);

  return (
    <div className="bg-gray-300 min-h-screen p-2">
      {loading && <LoadingSpinner />} {/* Show loading spinner when loading */}
      <div className="flex flex-row w-full items-center space-x-4 justify-between">
        <h1 className="text-4xl mb-4">Analytics</h1>
        <div className="flex bg-gray-200 p-2 m-0 rounded-lg mb-4 items-center overflow-x-auto">
          <div className="flex flex-row space-x-8 items-center">
            {/* Report Select */}
            <div className="flex flex-row space-x-2 items-center">
              <label
                htmlFor="report"
                className="flex text-sm font-medium items-center justify-center"
              >
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
                        <span className="text-gray-500 pl-2">
                          {new Date(report.updated).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Date Range */}
            <div className="flex flex-row space-x-2 items-center">
              <label htmlFor="date_range" className="block text-sm font-medium">
                Date Range
              </label>
              <div className="relative">
                <DatePicker
                  selected={startDate}
                  onChange={(dates: [Date | null, Date | null]) => {
                    const [start, end] = dates;
                    setStartDate(start);
                    setEndDate(end);
                  }}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                  placeholderText="Select date range"
                  shouldCloseOnSelect={false}
                  popperContainer={({ children }) => (
                    <div className="fixed z-50">{children}</div>
                  )}
                />
              </div>
            </div>

            <div className="flex flex-row rounded-lg space-x-2 p-2 items-center justify-end">
              <label
                htmlFor="report"
                className="flex text-sm font-medium items-center justify-center"
              >
                Select KPI
              </label>
              <div className="relative">
                <select
                  value={selectedKPI}
                  onChange={(e) => setSelectedKPI(e.target.value)}
                  className="peer block rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                >
                  <option value="Gross Amount">Gross Amount</option>
                  <option value="Coupon Count">Coupon Count</option>
                  <option value="Ticket Count">Ticket Count</option>
                  <option value="Average Fare">Average Fare</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {chartData && (
          <>
            <KPIBox
              selectedKPI={
                selectedKPI === "Gross Amount" ? selectedKPI : "WHITE"
              }
              title={`Total Gross Amount (${reportInfo ? reportInfo[0].currency : "USD"})`}
              value={chartData.kpiDataGrossAmount.value}
              yoy={chartData.kpiDataGrossAmount.yoy}
              onClick={() => setSelectedKPI("Gross Amount")}
            />
            <KPIBox
              selectedKPI={
                selectedKPI === "Coupon Count" ? selectedKPI : "WHITE"
              }
              title="Total Coupon Count"
              value={chartData.kpiDataCouponCount.value}
              yoy={chartData.kpiDataCouponCount.yoy}
              onClick={() => setSelectedKPI("Coupon Count")}
            />
            <KPIBox
              selectedKPI={
                selectedKPI === "Ticket Count" ? selectedKPI : "WHITE"
              }
              title="Total Ticket Count"
              value={chartData.kpiDataTicketCount.value}
              yoy={chartData.kpiDataTicketCount.yoy}
              onClick={() => setSelectedKPI("Ticket Count")}
            />
            <KPIBox
              selectedKPI={
                selectedKPI === "Average Fare" ? selectedKPI : "WHITE"
              }
              title={`Average Fare (${reportInfo ? reportInfo[0].currency : "USD"})`}
              value={chartData.kpiDataAverageFare.value}
              yoy={chartData.kpiDataAverageFare.yoy}
              onClick={() => setSelectedKPI("Average Fare")}
            />
          </>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <div className="col-span-4 bg-white p-4 rounded-lg mb-4">
          <Tabs defaultValue="Day" className="w-full">
            <TabsList>
              <TabsTrigger value="Day" onClick={() => setActiveTab(0)}>
                Day
              </TabsTrigger>
              <TabsTrigger value="Week" onClick={() => setActiveTab(1)}>
                Week
              </TabsTrigger>
              <TabsTrigger value="Month" onClick={() => setActiveTab(2)}>
                Month
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Day">
              {activeTab === 0 &&
                chartData &&
                chartData[`daily${selectedKPI.trim().replace(/\s+/g, "")}`] &&
                selectedKPI && (
                  <div className="justify-center">
                    <Line
                      data={
                        chartData[
                          `daily${selectedKPI.trim().replace(/\s+/g, "")}`
                        ]
                      }
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
                              text: `${selectedKPI} ${
                                selectedKPI === "Gross Amount" ||
                                selectedKPI === "Average Fare"
                                  ? `(${reportInfo ? reportInfo[0].currency : "USD"})`
                                  : ""
                              }`,
                            },
                          },
                          x: {
                            title: {
                              display: true,
                              text: reportInfo
                                ? reportInfo[0].date_concept
                                : "",
                            },
                          },
                        },
                      }}
                    />
                  </div>
                )}
            </TabsContent>
            <TabsContent value="Week">
              {activeTab === 1 &&
                chartData &&
                chartData[`weekly${selectedKPI.trim().replace(/\s+/g, "")}`] &&
                selectedKPI && (
                  <div className="justify-center">
                    <Line
                      data={{
                        ...chartData[
                          `weekly${selectedKPI.trim().replace(/\s+/g, "")}`
                        ],
                        datasets: chartData[
                          `weekly${selectedKPI.trim().replace(/\s+/g, "")}`
                        ].datasets.map((dataset: any) => ({
                          ...dataset,
                          fill: true, // Fill the area under the line
                          bakcgroundColor: "rgba(75, 192, 192, 0.2)", // Set the fill color
                        })),
                      }}
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
                              text: `${selectedKPI} (${reportInfo ? reportInfo[0].currency : "USD"})`,
                            },
                          },
                          x: {
                            title: {
                              display: true,
                              text: reportInfo
                                ? reportInfo[0].date_concept
                                : "",
                            },
                          },
                        },
                        plugins: {
                          filler: {
                            propagate: false,
                          },
                        },
                      }}
                    />
                  </div>
                )}
            </TabsContent>
            <TabsContent value="Month">
              {activeTab === 2 &&
                chartData &&
                chartData[`monthly${selectedKPI.trim().replace(/\s+/g, "")}`] &&
                selectedKPI && (
                  <div className="justify-center">
                    <Bar
                      data={
                        chartData[
                          `monthly${selectedKPI.trim().replace(/\s+/g, "")}`
                        ]
                      }
                      options={{
                        scales: {
                          y: {
                            title: {
                              display: true,
                              text: `${selectedKPI} ${
                                selectedKPI === "Gross Amount" ||
                                selectedKPI === "Average Fare"
                                  ? `(${reportInfo ? reportInfo[0].currency : "USD"})`
                                  : ""
                              }`,
                            },
                          },
                          x: {
                            title: {
                              display: true,
                              text: reportInfo
                                ? reportInfo[0].date_concept
                                : "",
                            },
                          },
                        },
                      }}
                    />
                  </div>
                )}
            </TabsContent>
          </Tabs>
        </div>

        <ReportInfo reportInfo={reportInfo} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-4">
            Airline Wise{" "}
            {`${selectedKPI} ${
              selectedKPI === "Gross Amount" || selectedKPI === "Average Fare"
                ? `(${reportInfo ? reportInfo[0].currency : "USD"})`
                : ""
            }`}
          </h2>
          {chartData &&
            chartData[`AirlineData${selectedKPI.trim().replace(/\s+/g, "")}`] &&
            selectedKPI && (
              <Doughnut
                data={{
                  ...chartData[
                    `AirlineData${selectedKPI.trim().replace(/\s+/g, "")}`
                  ],
                  datasets: [
                    {
                      ...chartData[
                        `AirlineData${selectedKPI.trim().replace(/\s+/g, "")}`
                      ].datasets[0],
                      backgroundColor: [
                        "rgba(23, 87, 235, 0.2)",
                        "rgba(250, 192, 192, 0.2)",
                        "rgba(34, 20, 78, 0.2)",
                        "rgba(56, 159, 64, 0.4)",
                        "rgba(200, 20, 80, 0.2)",
                        "rgba(50, 206, 86, 0.4)",
                        "rgba(50, 100, 44, 0.2)",
                        "rgba(89, 20, 86, 0.2)",
                        "rgba(250, 240, 30, 0.4)",
                        "rgba(10, 22, 86, 0.2)",
                        "rgba(0, 255, 255, 0.6)",
                        "rgba(0, 0, 255, 0.6)",
                        "rgba(0, 128, 0, 0.6)",
                        "rgba(0, 255, 0, 0.6)",
                        "rgba(0, 0, 128, 0.6)",
                        "rgba(0, 128, 128, 0.6)",
                        "rgba(128, 0, 128, 0.6)",
                        "rgba(0, 255, 255, 0.6)",
                        "rgba(0, 0, 255, 0.6)",
                        "rgba(0, 128, 0, 0.6)",
                        "rgba(0, 255, 0, 0.6)",
                        "rgba(255, 205, 86, 0.6)",
                        "rgba(255, 99, 132, 0.6)",
                        "rgba(54, 162, 235, 0.6)",
                        "rgba(255, 206, 86, 0.6)",
                        "rgba(75, 192, 192, 0.6)",
                        "rgba(153, 102, 255, 0.6)",
                        "rgba(255, 159, 64, 0.6)",
                        "rgba(201, 203, 207, 0.6)",
                        "rgba(255, 205, 86, 0.6)",
                        "rgba(75, 192, 192, 0.6)",
                        "rgba(54, 162, 235, 0.6)",
                        "rgba(255, 99, 132, 0.6)",
                        "rgba(255, 159, 64, 0.6)",
                        "rgba(153, 102, 255, 0.6)",
                        "rgba(201, 203, 207, 0.6)",
                        "rgba(128, 0, 128, 0.6)",
                        "rgba(0, 255, 255, 0.6)",
                        "rgba(0, 0, 255, 0.6)",
                        "rgba(0, 128, 0, 0.6)",
                        "rgba(0, 255, 0, 0.6)",
                        "rgba(0, 0, 128, 0.6)",
                        "rgba(0, 128, 128, 0.6)",
                        "rgba(128, 0, 128, 0.6)",
                        "rgba(0, 255, 255, 0.6)",
                        "rgba(0, 0, 255, 0.6)",
                        "rgba(0, 128, 0, 0.6)",
                        "rgba(0, 255, 0, 0.6)",
                      ],
                    },
                  ],
                }}
              />
            )}
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-4">
            Cabin Wise{" "}
            {`${selectedKPI} ${
              selectedKPI === "Gross Amount" || selectedKPI === "Average Fare"
                ? `(${reportInfo ? reportInfo[0].currency : "USD"})`
                : ""
            }`}
          </h2>
          {chartData &&
            chartData[`ClassData${selectedKPI.trim().replace(/\s+/g, "")}`] &&
            selectedKPI && (
              <Doughnut
                data={
                  chartData[
                    `ClassData${selectedKPI.trim().replace(/\s+/g, "")}`
                  ]
                }
              />
            )}
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-4">
            Agency Wise{" "}
            {`${selectedKPI} ${
              selectedKPI === "Gross Amount" || selectedKPI === "Average Fare"
                ? `(${reportInfo ? reportInfo[0].currency : "USD"})`
                : ""
            }`}
          </h2>
          {chartData &&
            chartData[`AgencyData${selectedKPI.trim().replace(/\s+/g, "")}`] &&
            selectedKPI && (
              <Bar
                data={
                  chartData[
                    `AgencyData${selectedKPI.trim().replace(/\s+/g, "")}`
                  ]
                }
                options={{
                  indexAxis: "y",
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: `${selectedKPI} ${
                          selectedKPI === "Gross Amount" ||
                          selectedKPI === "Average Fare"
                            ? `(${reportInfo ? reportInfo[0].currency : "USD"})`
                            : ""
                        }`,
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Agency",
                      },
                    },
                  },
                }}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
