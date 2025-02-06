'use client';
import React from 'react';

interface ReportInfoProps {
  reportInfo: any;
}

const ReportInfo: React.FC<ReportInfoProps> = ({ reportInfo }) => {
  return (
    <div className="col-span-3 bg-white p-4 rounded-lg mb-4 flex flex-col justify-top">
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
                  {reportInfo[0].benchmark_period === 'Yes' ? (
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
            {reportInfo[0].is_custom_sql_active === '1' && (
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
  );
};

export default ReportInfo;