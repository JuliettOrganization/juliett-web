import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function UserStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-red-100 text-red-500": status === "disabled",
          "bg-green-500 text-white": status === "enabled",
        },
      )}
    >
      {status === "disabled" ? (
        <>
          disabled
          <ClockIcon className="ml-1 w-4 text-red-500" />
        </>
      ) : null}
      {status === "enabled" ? (
        <>
          enabled
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
