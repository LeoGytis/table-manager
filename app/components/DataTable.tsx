"use client";
import { useQuery } from "@tanstack/react-query";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { columnsData } from "../data/columnsData";
import mockFetchUsers from "../data/mockFetchUsers";
import Chart from "./ChartView";
import { ColumnSettings } from "./ColumnSettings";
import FiltersSideBar from "./FiltersSideBar";
import TableView from "./TableView";

const DataTable = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showColumnSettings, setShowColumnSettings] = useState<boolean>(false);
  const [toggleView, setToggleView] = useState<"Table" | "Chart">("Table");
  const [showColumnInfo, setShowColumnInfo] = useState<boolean>(false);
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({
    firstName: true,
    lastName: true,
    email: true,
    age: true,
    startDate: true,
    projectsCount: true,
  });

  const [filters, setFilters] = useState<
    Record<string, string | number | number[]>
  >(() => {
    const params = new URLSearchParams(searchParams.toString());
    const projectsCount = params.get("projectsCount");

    if (projectsCount && isNaN(Number(projectsCount))) {
      params.delete("projectsCount");
    }

    return {
      firstName: params.get("firstName") || "",
      lastName: params.get("lastName") || "",
      email: params.get("email") || "",
      age: params.get("age")
        ? JSON.parse(params.get("age") as string)
        : [0, 100],
      startDate: params.get("startDate") || "",
      projectsCount:
        projectsCount && !isNaN(Number(projectsCount))
          ? Number(projectsCount)
          : "",
    };
  });

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", filters],
    queryFn: () => mockFetchUsers(filters),
  });

  const table = useReactTable({
    data: users,
    columns: columnsData,
    state: { columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  });

  const updateURLParams = (
    newFilters: Record<string, string | number | number[]>
  ) => {
    const params = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== "" && value !== undefined) {
        params.set(
          key,
          typeof value === "object" ? JSON.stringify(value) : String(value)
        );
      }
    });

    if (!newFilters.projectsCount || isNaN(Number(newFilters.projectsCount))) {
      params.delete("projectsCount");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleFilterChange = (
    newFilters: Record<string, string | number | number[]>
  ) => {
    if (newFilters.projectsCount === "") {
      delete newFilters.projectsCount;
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return (
    <div className="flex gap-4 my-5">
      <FiltersSideBar filters={filters} onFilterChange={handleFilterChange} />
      <div className="w-full flex flex-col gap-4 mb-3">
        <div className="bg-blue text-white border border-green rounded p-4">
          <div className="flex justify-between items-center text-green font-semibold ">
            <div
              onClick={() => (window.location.href = "/")}
              className="text-2xl cursor-pointer"
            >
              Table Manager
            </div>
            <div className="flex items-center gap-4">
              <div
                className={`cursor-pointer p-2 border rounded ${
                  toggleView === "Table"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setToggleView("Table")}
              >
                Table View
              </div>
              <div
                className={`cursor-pointer p-2 border rounded ${
                  toggleView === "Chart"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setToggleView("Chart")}
              >
                Chart View
              </div>
              <div
                onClick={() => setShowColumnSettings(!showColumnSettings)}
                className="w-fit ml-auto text-end text-lg text-green cursor-pointer hover:shadow-green hover:shadow-md border border-green rounded p-2"
              >
                Column Settings
              </div>
            </div>
          </div>
          {showColumnSettings && (
            <ColumnSettings
              columnVisibility={columnVisibility}
              setColumnVisibility={setColumnVisibility}
              showColumnInfo={showColumnInfo}
              setShowColumnInfo={setShowColumnInfo}
            />
          )}
        </div>

        {isLoading ? (
          <p className="text-center">Loading data...</p>
        ) : toggleView === "Table" ? (
          <TableView
            table={table}
            showColumnInfo={showColumnInfo}
            columnsData={columnsData}
          />
        ) : (
          <Chart users={users} />
        )}
      </div>
    </div>
  );
};

export default DataTable;
