'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import AccountForm from '@/app/ui/home_user/admin/accounts/accountform/AccountForm';

export default function Page() {
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [initialValues, setInitialValues] = useState({
    initialAccountId: '',
    initialAccountName: '',
    initialBilling: false,
    initialSelectedFile: null,
    initialSelectedCurrencies: [],
    initialSelectedSources: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await fetch('/api/account/getAccountDetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        if (response.ok) {
          const data = await response.json();
          setInitialValues({
            initialAccountId: data.accountid,
            initialAccountName: data.accountname,
            initialBilling: data.billing,
            initialSelectedFile: data.selectedfile,
            initialSelectedCurrencies: data.selectedcurrencies.split(';'),
            initialSelectedSources: data.datasources.split(';'),
          });
        } else {
          console.error('Failed to fetch account details');
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAccountDetails();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AccountForm
     
      initialAccountName={initialValues.initialAccountName}
      initialBilling={initialValues.initialBilling}
      initialSelectedFile={initialValues.initialSelectedFile}
      initialSelectedCurrencies={initialValues.initialSelectedCurrencies}
      initialSelectedSources={initialValues.initialSelectedSources}
    />
  );
}