import { fetchFilteredReports } from '@/app/lib/data';
import ReportsTableClient from './table';

export async function ReportsTableServer({ query, currentPage }: { query: string; currentPage: number }) {
  const reports = await fetchFilteredReports(query, currentPage);
  
  return <ReportsTableClient reports={reports} />;
}
