import CreateFormLayout from '@/app/ui/home_account/reportdesign/0_main_sub_layout';

export default function Page() {
  const defaultValues = {
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
  };

  return (
    <main>
      <div>
        <CreateFormLayout {...defaultValues} />
      </div>
    </main>
  );
}