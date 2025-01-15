'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import CreateFormLayout from '@/app/ui/home_account/reportdesign/0_main_sub_layout';

export default function Page() {
  const pathname = usePathname();
  const reportid = pathname ? pathname.split('/').pop() || undefined : undefined;
  const [initialValues, setInitialValues] = useState({
    reportName: '',
    description: '',
    tags: [],
    dateConcept: 'Issue Date',
    dateFrom: '2025-01-01',
    dateTo: '2025-12-31',
    benchmarkPeriod: 'Yes',
    benchmarkDateFrom: '2024-01-01',
    benchmarkDateTo: '2024-12-31',
    currency: '',
    fields: [],
    transactionType: [],
    amounts: [],
    ODconcept: 'Ticket based',
    ODfiltering: 'Include',
    isCustomSqlActive: false,
    selectedGroupingAgency: '',
    selectedGroupingGeoFrom: '',
    selectedGroupingGeoTo: '',
    selectedGroupingIssuing: '',
    selectedGroupingMarketing: '',
    selectedGroupingOperating: '',
    selectedGroupingValuesAgency: [],
    selectedGroupingValuesGeoFrom: [],
    selectedGroupingValuesGeoTo: [],
    selectedGroupingValuesIssuing: [],
    selectedGroupingValuesMarketing: [],
    selectedGroupingValuesOperating: [],
    sqlCode: '',
  });
  const [loading, setLoading] = useState(true);
  const getRandomColor = () => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  useEffect(() => {
    if (reportid) {
      fetch(`/api/home_account/reportdesign/getReportDetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportid }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch report details');
          }
          return response.json();
        })
        .then((data) => {
            setInitialValues({
            reportName: data.reportname,
            description: data.description,
            tags: data.tags.map((tag: string) => ({ text: tag, color: getRandomColor() })),
            dateConcept: data.date_concept,
            dateFrom: data.date_from,
            dateTo: data.date_to,
            benchmarkPeriod: data.benchmark_period,
            benchmarkDateFrom: data.benchmark_date_from,
            benchmarkDateTo: data.benchmark_date_to,
            currency: data.currency,
            fields: data.fields,
            transactionType: data.transaction_type,
            amounts: data.amounts,
            ODconcept: data.od_concept,
            ODfiltering: data.od_filtering,
            isCustomSqlActive: data.is_custom_sql_active,
            selectedGroupingAgency: data.selected_grouping_agency,
            selectedGroupingGeoFrom: data.selected_grouping_geo_from,
            selectedGroupingGeoTo: data.selected_grouping_geo_to,
            selectedGroupingIssuing: data.selected_grouping_issuing,
            selectedGroupingMarketing: data.selected_grouping_marketing,
            selectedGroupingOperating: data.selected_grouping_operating,
            selectedGroupingValuesAgency: data.selected_grouping_values_agency,
            selectedGroupingValuesGeoFrom: data.selected_grouping_values_geo_from,
            selectedGroupingValuesGeoTo: data.selected_grouping_values_geo_to,
            selectedGroupingValuesIssuing: data.selected_grouping_values_issuing,
            selectedGroupingValuesMarketing: data.selected_grouping_values_marketing,
            selectedGroupingValuesOperating: data.selected_grouping_values_operating,
            sqlCode: data.sql_code,
          });
        })
        .catch((error) => {
          console.error('Error fetching report details:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [reportid]);


  return (
    <main>
      <div>
        <CreateFormLayout {...initialValues} reportid={reportid} />
      </div>
    </main>
  );
}