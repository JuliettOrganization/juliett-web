"use client";

import { Suspense } from "react";
import AccountForm from "@/app/home_user/admin/accounts/create/ui/AccountForm";

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

const initialAccountFormValues: AccountFormProps = {
  initialAccountName: "Default Account Name",
  initialBilling: true,
  initialSelectedFile: null,
  initialSelectedCurrencies: ["USD", "EUR"],
  initialSelectedSources: [],
  initialSelectedUsers: [],
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccountForm {...initialAccountFormValues} />
    </Suspense>
  );
}
