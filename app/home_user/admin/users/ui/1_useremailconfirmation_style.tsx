import { CheckIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function EmailConfirmation({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-gray-100 text-gray-500": status === "not confirmed",
          "bg-green-500 text-white": status === "confirmed",
        },
      )}
    >
      {status === "not confirmed" ? (
        <>
          not confirmed
          <ExclamationCircleIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === "confirmed" ? (
        <>
          confirmed
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
