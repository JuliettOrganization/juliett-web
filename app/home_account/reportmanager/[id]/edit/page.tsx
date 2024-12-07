// import Form from '@/app/ui/home_account/reportmanager/TEMPLATE - edit-form';
import Breadcrumbs from '@/app/ui/home_account/reportmanager/breadcrumbs';
import { fetchReportById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';

 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [invoice, customers] = await Promise.all([
      fetchReportById(id),
      fetchCustomers(),
    ]);
    if (!invoice) {
        notFound();
    }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Reports', href: '/home_account/report_manager' },
          {
            label: 'Edit Report',
            href: `//home_account/report_manager/${id}/edit`,
            active: true,
          },
        ]}
      />
      {/* <Form invoice={invoice} customers={customers} /> */}
    </main>
  );
}