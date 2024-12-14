'use client';

import { Suspense } from 'react';
import AccountForm from '@/app/ui/home_user/admin/accounts/accountform/AccountForm';

interface User {
  id: string;
  email: string;
}

interface AccountFormProps {
  initialAccountName: string;
  initialBilling: boolean;
  initialSelectedFile: File | null;
  initialSelectedCurrencies: string[];
  initialSelectedSources: string[]; 
  initialSelectedUsers: User[]; 
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccountForm
        initialAccountName="Default Account Name"
        initialBilling={true}
        initialSelectedFile={null}
        initialSelectedCurrencies={['USD', 'EUR']}
        initialSelectedSources={[]}
        initialSelectedUsers={[]}
      />
    </Suspense>
  );
}