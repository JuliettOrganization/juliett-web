import { fetchFilteredAccounts } from '@/app/lib/data';
import AccountsTableClient from './1_table_accounts';

export async function AccountsTableServer({ query, currentPage }: { query: string; currentPage: number }) {
  const accounts = await fetchFilteredAccounts(query, currentPage);
  
  return <AccountsTableClient accounts={accounts} />;
}
