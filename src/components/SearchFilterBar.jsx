import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchFilterBar(props) {
  const searchProp = props.search ?? props.searchTerm ?? "";
  const onSearchProp = props.onSearch ?? props.setSearchTerm ?? (() => {});
  const filterValueProp = props.filterValue ?? props.statusFilter ?? "";
  const onFilterChangeProp =
    props.onFilterChange ?? props.setStatusFilter ?? (() => {});
  const filterOptionsProp = props.filterOptions ?? null;
  const customDropdownProp = props.customDropdown ?? null;

  const placeholder = props.placeholder ?? "Search...";
  const title = props.title ?? "All Records";
  const subtitle = props.subtitle ?? "View and filter items.";

  const [localSearch, setLocalSearch] = useState(searchProp);

  useEffect(() => {
    setLocalSearch(searchProp ?? "");
  }, [searchProp]);

  // useEffect(() => {
  //   if ((localSearch ?? "").trim() === "") {
  //     onSearchProp("");
  //   }
  // }, [localSearch, onSearchProp]);

  const disableEnter = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  const renderDropdown = () => {
    if (customDropdownProp) {
      if (typeof customDropdownProp === "function") {
        return customDropdownProp(onFilterChangeProp);
      }
      return customDropdownProp;
    }

    if (Array.isArray(filterOptionsProp) && filterOptionsProp.length > 0) {
      return (
        <select
          value={filterValueProp}
          onChange={(e) => onFilterChangeProp(e.target.value)}
          className="px-4 py-2.5 bg-white border rounded-lg text-gray-700"
        >
          {filterOptionsProp.map((opt) =>
            typeof opt === "object" ? (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ) : (
              <option key={opt} value={opt}>
                {opt}
              </option>
            )
          )}
        </select>
      );
    }

    return null;
  };

  return (
    <div className="rounded-lg p-4 bg-[#F5F5F5] mt-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>

      {/* RESPONSIVE WRAP FIX */}
      <div className=" mb-6 flex flex-wrap gap-4 items-center">
        {/* Search Input */}
        <div className="flex-1 min-w-[250px] relative">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder={placeholder}
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={disableEnter}
            className="w-full bg-white pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={() => onSearchProp(localSearch)}
          className="px-6 py-2.5 bg-[#2B347A] text-white rounded-lg hover:bg-[#1f275c] whitespace-nowrap"
        >
          Search
        </button>

        {/* Dropdown */}
        <div className="md:min-w-[150px]">{renderDropdown()}</div>
      </div>
    </div>
  );
}
