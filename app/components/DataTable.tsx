// components/DataTable.tsx

"use client";
import { useQuery } from "@tanstack/react-query";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { columnsData } from "../data/columnsData";
import mockFetchUsers from "../data/mockFetchUsers";
import Chart from "./ChartView";
import FiltersSideBar from "./FiltersSideBar";
import NavBar from "./NavBar";
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
      <div className="w-full flex flex-col justify-between gap-4 mb-3">
        <NavBar
          toggleView={toggleView}
          setToggleView={setToggleView}
          showColumnSettings={showColumnSettings}
          setShowColumnSettings={setShowColumnSettings}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          showColumnInfo={showColumnInfo}
          setShowColumnInfo={setShowColumnInfo}
        />
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
