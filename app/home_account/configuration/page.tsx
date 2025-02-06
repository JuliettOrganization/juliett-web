"use client";
import { Building2, Network, Plane, Route, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/app/ui_general/LoadingSpinner";

const items = [
  {
    title: "Agency Grouping",
    url: "/home_account/configuration/agencygrouping",
    icon: Building2,
    description: "Manage and configure agency groupings.",
  },
  {
    title: "Class Mapping",
    url: "/home_account/configuration/classmapping",
    icon: Network,
    description: "Map airline classes to your own classifications.",
  },
  {
    title: "Airline Groupings",
    url: "/home_account/configuration/airlinegrouping",
    icon: Plane,
    description: "Group airlines for reporting and analysis.",
  },
  {
    title: "Geographical Groupings",
    url: "/home_account/configuration/geogrouping",
    icon: Route,
    description: "Define geographical groupings for your data.",
  },
];

export default function Page() {
  return (
    <main className="p-10">
      <div className="rounded-xl border-none p-2">
        <div className="space-y-4">
          <div className="mb-4 text-4xl">Account Configuration</div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 text-base text-yellow-600 mb-20">
            <AlertTriangle className="w-6 h-6" />
            <span>
              These configurations are at account level. All users of the
              accounts will have the same account configurations.
            </span>
          </div>
          <div className="h-2"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {items.map((item) => (
              <CardComponent
                key={item.title}
                title={item.title}
                description={item.description}
                icon={item.icon}
                path={item.url}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function CardComponent({
  title,
  description,
  icon: Icon,
  path,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false); // Stop loading when the component mounts or updates
  }, []);

  const handleClick = () => {
    setLoading(true);
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <Link
        href={path}
        className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        onClick={handleClick}
      >
        <div className="p-4 border-b">
          <div className="flex items-center space-x-4">
            <Icon className="w-6 h-6 text-gray-500" />
            <span className="text-lg font-semibold">{title}</span>
          </div>
        </div>
        <div className="p-4">
          <p className="text-gray-700">{description}</p>
        </div>
        <div className="p-4 border-t">
          <div className="text-blue-500 hover:underline">
            Click here to access
          </div>
        </div>
      </Link>
    </>
  );
}
