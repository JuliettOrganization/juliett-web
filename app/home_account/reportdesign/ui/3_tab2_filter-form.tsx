"use client";
import CheckBoxGroupingAgency from "@/app/home_account/reportdesign/ui/3_tab2_filter-form-check-box-agency";
import CheckBoxOperating from "./3_tab2_filter-form-check-box-operating";
import CheckBoxIssuing from "./3_tab2_filter-form-check-box-issuing";
import CheckBoxMarketing from "./3_tab2_filter-form-check-box-marketing";
import CheckBoxGeoTo from "./3_tab2_filter-form-check-box-geo-to";
import CheckBoxGeoFrom from "./3_tab2_filter-form-check-box-geo-from";
import RadioButtonListItinerary from "./3_tab2_filter-form-radio-button-itinerary";
import ToggleSwitchItinerary from "./3_tab2_filter-form-toggle-exclude";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/app/ui_general/LoadingSpinner";

interface FilterFormProps {
  selectedGroupingAgency: string;
  setSelectedGroupingAgency: (value: string) => void;
  selectedGroupingValuesAgency: string[];
  setSelectedGroupingValuesAgency: (values: string[]) => void;
  isDropdownOpenAgency: boolean;
  toggleDropdownAgency: () => void;

  selectedGroupingIssuing: string;
  setSelectedGroupingIssuing: (value: string) => void;
  selectedGroupingValuesIssuing: string[];
  setSelectedGroupingValuesIssuing: (values: string[]) => void;
  isDropdownOpenIssuing: boolean;
  toggleDropdownIssuing: () => void;

  selectedGroupingMarketing: string;
  setSelectedGroupingMarketing: (value: string) => void;
  selectedGroupingValuesMarketing: string[];
  setSelectedGroupingValuesMarketing: (values: string[]) => void;
  isDropdownOpenMarketing: boolean;
  toggleDropdownMarketing: () => void;

  selectedGroupingOperating: string;
  setSelectedGroupingOperating: (value: string) => void;
  selectedGroupingValuesOperating: string[];
  setSelectedGroupingValuesOperating: (values: string[]) => void;
  isDropdownOpenOperating: boolean;
  toggleDropdownOperating: () => void;

  selectedGroupingGeoFrom: string;
  setSelectedGroupingGeoFrom: (value: string) => void;
  selectedGroupingValuesGeoFrom: string[];
  setSelectedGroupingValuesGeoFrom: (values: string[]) => void;
  isDropdownOpenGeoFrom: boolean;
  toggleDropdownGeoFrom: () => void;

  selectedGroupingGeoTo: string;
  setSelectedGroupingGeoTo: (value: string) => void;
  selectedGroupingValuesGeoTo: string[];
  setSelectedGroupingValuesGeoTo: (values: string[]) => void;
  isDropdownOpenGeoTo: boolean;
  toggleDropdownGeoTo: () => void;

  ODconcept: string;
  setODconcept: (value: string) => void;
  ODfiltering: string;
  setODfiltering: (value: string) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({
  selectedGroupingAgency,
  setSelectedGroupingAgency,
  selectedGroupingValuesAgency,
  setSelectedGroupingValuesAgency,
  isDropdownOpenAgency,
  toggleDropdownAgency,

  selectedGroupingIssuing,
  setSelectedGroupingIssuing,
  selectedGroupingValuesIssuing,
  setSelectedGroupingValuesIssuing,
  isDropdownOpenIssuing,
  toggleDropdownIssuing,

  selectedGroupingMarketing,
  setSelectedGroupingMarketing,
  selectedGroupingValuesMarketing,
  setSelectedGroupingValuesMarketing,
  isDropdownOpenMarketing,
  toggleDropdownMarketing,

  selectedGroupingOperating,
  setSelectedGroupingOperating,
  selectedGroupingValuesOperating,
  setSelectedGroupingValuesOperating,
  isDropdownOpenOperating,
  toggleDropdownOperating,

  selectedGroupingGeoFrom,
  setSelectedGroupingGeoFrom,
  selectedGroupingValuesGeoFrom,
  setSelectedGroupingValuesGeoFrom,
  isDropdownOpenGeoFrom,
  toggleDropdownGeoFrom,

  selectedGroupingGeoTo,
  setSelectedGroupingGeoTo,
  selectedGroupingValuesGeoTo,
  setSelectedGroupingValuesGeoTo,
  isDropdownOpenGeoTo,
  toggleDropdownGeoTo,

  ODconcept,
  setODconcept,
  ODfiltering,
  setODfiltering,
}) => {
  const [agencyGroupings, setAgencyGroupings] = useState<string[]>([]);
  const [airlineGroupingsIssuing, setAirlineGroupingsIssuing] = useState<
    string[]
  >([]);
  const [airlineGroupingsMarketing, setAirlineGroupingsMarketing] = useState<
    string[]
  >([]);
  const [airlineGroupingsOperating, setAirlineGroupingsOperating] = useState<
    string[]
  >([]);
  const [GroupingsGeoFrom, setGroupingsGeoFrom] = useState<string[]>([]);
  const [GroupingsGeoTo, setGroupingsGeoTo] = useState<string[]>([]);
  const [loadingAgency, setLoadingAgency] = useState<boolean>(false);
  const [loadingIssuing, setLoadingIssuing] = useState<boolean>(false);
  const [loadingMarketing, setLoadingMarketing] = useState<boolean>(false);
  const [loadingOperating, setLoadingOperating] = useState<boolean>(false);
  const [loadingGeoFrom, setLoadingGeoFrom] = useState<boolean>(false);
  const [loadingGeoTo, setLoadingGeoTo] = useState<boolean>(false);

  useEffect(() => {
    setLoadingAgency(true);
    fetch("/api/home_account/reportdesign/agencyfilter/agencyGrouping")
      .then((response) => response.json())
      .then((data) => setAgencyGroupings(data))
      .catch((error) =>
        console.error("Error fetching agency groupings:", error),
      )
      .finally(() => setLoadingAgency(false));

    setLoadingIssuing(true);
    fetch("/api/home_account/reportdesign/airlinefilter/airlineGrouping")
      .then((response) => response.json())
      .then((data) => setAirlineGroupingsIssuing(data))
      .catch((error) =>
        console.error("Error fetching airline groupings:", error),
      )
      .finally(() => setLoadingIssuing(false));

    setLoadingMarketing(true);
    fetch("/api/home_account/reportdesign/airlinefilter/airlineGrouping")
      .then((response) => response.json())
      .then((data) => setAirlineGroupingsMarketing(data))
      .catch((error) =>
        console.error("Error fetching airline groupings:", error),
      )
      .finally(() => setLoadingMarketing(false));

    setLoadingOperating(true);
    fetch("/api/home_account/reportdesign/airlinefilter/airlineGrouping")
      .then((response) => response.json())
      .then((data) => setAirlineGroupingsOperating(data))
      .catch((error) =>
        console.error("Error fetching airline groupings:", error),
      )
      .finally(() => setLoadingOperating(false));

    setLoadingGeoFrom(true);
    fetch("/api/home_account/reportdesign/geofilter/geoGrouping")
      .then((response) => response.json())
      .then((data) => setGroupingsGeoFrom(data))
      .catch((error) => console.error("Error fetching geo groupings:", error))
      .finally(() => setLoadingGeoFrom(false));

    setLoadingGeoTo(true);
    fetch("/api/home_account/reportdesign/geofilter/geoGrouping")
      .then((response) => response.json())
      .then((data) => setGroupingsGeoTo(data))
      .catch((error) => console.error("Error fetching geo groupings:", error))
      .finally(() => setLoadingGeoTo(false));
  }, []);

  return (
    <form className="flex flex-col overflow-x-auto">
      {/* AGENCY FILTERING*/}
      <div className="flex flex-row rounded-lg sm:w-[90vw] bg-white pl-4">
        <div className="flex flex-row rounded-lg bg-white w-56 items-center">
          <label className="flex h-[70%] text-l items-center justify-center pr-4 text-black font-bold bg-white border-r-4 border-gray-700 w-96">
            Agency Filtering
          </label>
        </div>
        <div className="rounded-md bg-white items-center">
          <div className="flex flex-row rounded-md bg-white pt-4 pr-4 pl-6 pb-1 space-x-6 items-center">
            <div className="mb-4 items-center">
              <label
                htmlFor="AgencyGroup"
                className="mb-2 block text-sm font-medium w-64"
              >
                Agency Grouping
              </label>
              <div className="relative">
                <select
                  id="Agency"
                  name="Agency"
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                  value={selectedGroupingAgency}
                  onChange={(e) => setSelectedGroupingAgency(e.target.value)}
                >
                  <option value="None" className="bg-white"></option>
                  {loadingAgency ? (
                    <option value="loading" disabled>
                      Loading...
                    </option>
                  ) : (
                    agencyGroupings.map((grouping, index) => (
                      <option key={index} value={grouping} className="bg-white">
                        {grouping}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* Grouping values filtering */}

            <CheckBoxGroupingAgency
              selectedGroupingAgency={selectedGroupingAgency}
              selectedGroupingValuesAgency={selectedGroupingValuesAgency}
              setSelectedGroupingValuesAgency={setSelectedGroupingValuesAgency}
              isDropdownOpenAgency={isDropdownOpenAgency}
              toggleDropdownAgency={toggleDropdownAgency}
            />
          </div>
        </div>
      </div>

      {/* AIRLINE FILTERING*/}
      <div className="flex flex-row sm:w-[90vw] bg-gray-200 pt-2 pb-2 pl-4">
        <div className="flex flex-row bg-gray-200 w-56 items-center ">
          <label className="flex h-[90%] text-l items-center justify-center pr-4 text-black bg-gray-200 font-bold border-r-4 border-gray-700 w-96">
            Airline Filtering
          </label>
        </div>
        <div className="rounded-md">
          <div className="flex flex-row  bg-gray-200  pt-4 pr-4 pl-6 pb-1 space-x-6">
            <div className="mb-4">
              <label
                htmlFor="Issuing"
                className="mb-2 block text-sm font-medium w-64"
              >
                Issuing Airline Grouping
              </label>
              <div className="relative">
                <select
                  id="Issuing"
                  name="Issuing"
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                  value={selectedGroupingIssuing}
                  onChange={(e) => setSelectedGroupingIssuing(e.target.value)}
                >
                  <option value="None" className="bg-white"></option>
                  {loadingIssuing ? (
                    <option value="loading" disabled>
                      Loading...
                    </option>
                  ) : (
                    airlineGroupingsIssuing.map((grouping, index) => (
                      <option key={index} value={grouping} className="bg-white">
                        {grouping}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* Grouping values filtering */}

            <CheckBoxIssuing
              selectedGroupingValuesIssuing={selectedGroupingValuesIssuing}
              setSelectedGroupingValuesIssuing={
                setSelectedGroupingValuesIssuing
              }
              selectedGroupingIssuing={selectedGroupingIssuing}
              isDropdownOpenIssuing={isDropdownOpenIssuing}
              toggleDropdownIssuing={toggleDropdownIssuing}
            />
          </div>

          <div className="flex flex-row  bg-gray-200  pt-0 pr-4 pl-6 pb-1 space-x-6">
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium w-64">
                Marketing Airline Grouping
              </label>
              <div className="relative">
                <select
                  id="Marketing"
                  name="Marketing"
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                  value={selectedGroupingMarketing}
                  onChange={(e) => setSelectedGroupingMarketing(e.target.value)}
                >
                  <option value="None" className="bg-white"></option>
                  {loadingMarketing ? (
                    <option value="loading" disabled>
                      Loading...
                    </option>
                  ) : (
                    airlineGroupingsMarketing.map((grouping, index) => (
                      <option key={index} value={grouping} className="bg-white">
                        {grouping}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* Grouping values filtering */}

            <CheckBoxMarketing
              selectedGroupingValuesMarketing={selectedGroupingValuesMarketing}
              setSelectedGroupingValuesMarketing={
                setSelectedGroupingValuesMarketing
              }
              selectedGroupingMarketing={selectedGroupingMarketing}
              isDropdownOpenMarketing={isDropdownOpenMarketing}
              toggleDropdownMarketing={toggleDropdownMarketing}
            />
          </div>

          <div className="flex flex-row bg-gray-200 pt-0 pr-4 pl-6 pb-1 space-x-6">
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium w-64">
                Operating Airline Grouping
              </label>
              <div className="relative">
                <select
                  id="Operating"
                  name="Operating"
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                  value={selectedGroupingOperating}
                  onChange={(e) => setSelectedGroupingOperating(e.target.value)}
                >
                  <option value="None" className="bg-white"></option>
                  {loadingOperating ? (
                    <option value="loading" disabled>
                      Loading...
                    </option>
                  ) : (
                    airlineGroupingsOperating.map((grouping, index) => (
                      <option key={index} value={grouping} className="bg-white">
                        {grouping}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* Grouping values filtering */}

            <CheckBoxOperating
              selectedGroupingValuesOperating={selectedGroupingValuesOperating}
              setSelectedGroupingValuesOperating={
                setSelectedGroupingValuesOperating
              }
              selectedGroupingOperating={selectedGroupingOperating}
              isDropdownOpenOperating={isDropdownOpenOperating}
              toggleDropdownOperating={toggleDropdownOperating}
            />
          </div>
        </div>
        <div className="flex flex-grow w-full bg-gray-200">
          <label className="ml-auto items-center text-gray-200 bg-gray-200"></label>
        </div>
      </div>

      {/* GEO FILTERING*/}
      <div className="flex flex-row rounded-lg bg-white pt-2 pb-2 pl-4">
        <div className="flex flex-row bg-white w-56 items-center">
          <label className="flex h-[80%] text-l items-center text-center pr-4 text-black bg-white font-bold border-r-4 border-gray-700 w-96">
            Origin & Destination Filtering
          </label>
        </div>
        <div className="rounded-md bg-white">
          <div className="flex flex-row rounded-md bg-white pt-4 pr-4 pl-6 pb-1 space-x-6">
            <div className="mb-4 items-center">
              <label
                htmlFor="OriginGroup"
                className="mb-2 block text-sm font-medium w-64"
              >
                Origin Grouping
              </label>
              <div className="relative">
                <select
                  id="Origin"
                  name="Origin"
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                  value={selectedGroupingGeoFrom}
                  onChange={(e) => setSelectedGroupingGeoFrom(e.target.value)}
                >
                  <option value="None" className="bg-white"></option>
                  {loadingGeoFrom ? (
                    <option value="loading" disabled>
                      Loading...
                    </option>
                  ) : (
                    GroupingsGeoFrom.map((grouping, index) => (
                      <option key={index} value={grouping} className="bg-white">
                        {grouping}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* Grouping values filtering */}

            <CheckBoxGeoFrom
              selectedGroupingValuesGeoFrom={selectedGroupingValuesGeoFrom}
              setSelectedGroupingValuesGeoFrom={
                setSelectedGroupingValuesGeoFrom
              }
              selectedGroupingGeoFrom={selectedGroupingGeoFrom}
              isDropdownOpenGeoFrom={isDropdownOpenGeoFrom}
              toggleDropdownGeoFrom={toggleDropdownGeoFrom}
            />
          </div>

          <div className="flex flex-row rounded-md bg-white pt-0 pr-4 pl-6 pb-1 space-x-6">
            <div className="mb-4 items-center">
              <label
                htmlFor="DestinationGroup"
                className="mb-2 block text-sm font-medium w-64"
              >
                Destination Grouping
              </label>
              <div className="relative">
                <select
                  id="Destination"
                  name="Destination"
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                  value={selectedGroupingGeoTo}
                  onChange={(e) => setSelectedGroupingGeoTo(e.target.value)}
                >
                  <option value="None" className="bg-white"></option>
                  {loadingGeoTo ? (
                    <option value="loading" disabled>
                      Loading...
                    </option>
                  ) : (
                    GroupingsGeoTo.map((grouping, index) => (
                      <option key={index} value={grouping} className="bg-white">
                        {grouping}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* OD Filetrs */}

            <CheckBoxGeoTo
              selectedGroupingValuesGeoTo={selectedGroupingValuesGeoTo}
              setSelectedGroupingValuesGeoTo={setSelectedGroupingValuesGeoTo}
              selectedGroupingGeoTo={selectedGroupingGeoTo}
              isDropdownOpenGeoTo={isDropdownOpenGeoTo}
              toggleDropdownGeoTo={toggleDropdownGeoTo}
            />
          </div>
        </div>

        {/* SEPARATION UI */}
        <div className="flex flex-row bg-white w-20 items-center">
          <label className="flex h-[80%] text-l items-center text-center pr-4 text-gray-500 bg-white font-medium border-r-4 border-gray-400 w-96"></label>
        </div>

        <div className="rounded-md bg-white">
          {/* OD CONCEPT RADIO BUTTON */}

          <div className="flex flex-col rounded-md bg-white pt-4 pr-4 pl-6 pb-1 justify-start">
            <label className="mb-2 block text-sm font-medium">
              O&D Concept
            </label>
            <div className="relative">
              <RadioButtonListItinerary
                ODconcept={ODconcept}
                setODconcept={setODconcept}
              />
            </div>
          </div>
        </div>
        {/* SEPARATION UI */}
        <div className="flex flex-row bg-white w-20 items-center">
          <label className="flex h-[80%] text-l items-center text-center pr-4 text-gray-500 bg-white font-medium border-r-4 border-gray-400 w-96"></label>
        </div>

        <div className="rounded-md">
          {/* OD Filtering TOGGLE */}

          <div className="flex-col w-auto rounded-md bg-white pt-4 pr-4 pl-6 pb-1 justify-start">
            <label className="mb-2 block text-sm font-medium">
              O&D Filtering
            </label>
            <div className="relative">
              <ToggleSwitchItinerary
                ODfiltering={ODfiltering}
                setODfiltering={setODfiltering}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default FilterForm;
