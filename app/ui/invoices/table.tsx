import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredReports } from '@/app/lib/data';

export default async function ReportsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const reports = await fetchFilteredReports(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0"> {/* this is the backround of the table */}
          
          <div className="md:hidden">
            {reports?.map((report) => (
              <div
                key={report.reportid}
                className="mb-2 w-full rounded-md bg-black p-4"
              >
                {/* <div className="flex items-center justify-between border-b pb-4"> */}
                  {/* <div>
                    <div className="mb-2 flex items-center">
                      <p>{report.reportname}</p>
                    </div>
                    <InvoiceStatus status={report.status} />
                    <p className="text-sm text-gray-500">{report.description}</p>
                  </div> */}
               
                {/* </div> */}
                         <div>
                        <p className="text-sm text-purple-500">{report.reportname}</p>
                        </div>
                        <div>
                        <InvoiceStatus status={report.status} />
                        </div>
                        <div>
                        <p className="text-sm text-purple-500">{report.description}</p>
                        </div>
                {/* <div className="flex w-full items-center justify-between pt-4"> */}
                      <div> 
                      <p className="text-sm text-gray-500">{report.date_concept}</p>
                        {/* <p>{formatDateToLocal(report.updated)}</p> */}
                      </div>
                        <div>
                        <p className="text-sm text-purple-500">{report.period}</p>
                        </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={report.reportid} />
                    <DeleteInvoice id={report.reportid} />
                  </div>
                </div>
              // </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Report Name
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  Description
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Period Concept
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Period
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {reports?.map((report) => (
                <tr
                //this is the KEY id to identify a unique row
                  key={report.reportid}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  {/* <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                    <p>{report.status}</p>
                    </div>
                  </td> */}
                   <td className="whitespace-nowrap px-4 py-3 sm:pl-6">
                    {report.reportname}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                  <InvoiceStatus status={report.status} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {report.description}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {report.date_concept}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {report.period}
                  </td>
                
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={report.reportid} />
                      <DeleteInvoice id={report.reportid} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
