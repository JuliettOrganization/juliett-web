import { CheckIcon, ClockIcon  } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function Billing({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'no',
          'bg-green-500 text-white': status === 'yes',
        },
      )}
    >
      {status === 'no' ? (
        <>
          no
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'yes' ? (
        <>
          yes
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
