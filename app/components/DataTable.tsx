"use client";
import { formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { columnsData, DataType } from "../data/columnsData";
import mockFetchUsers from "../data/mockFetchUsers";
import { ColumnSettings } from "./ColumnSettings";
import Filters from "./Filters";

const DataTable = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showColumnSettings, setShowColumnSettings] = useState<boolean>(false);
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
      <Filters filters={filters} onFilterChange={handleFilterChange} />
      <div className="w-full flex flex-col gap-4 mb-3">
        <div className="bg-blue text-white border border-green rounded p-4">
          <div className="flex justify-between items-center text-green font-semibold ">
            <div
              onClick={() => (window.location.href = "/")}
              className="text-2xl cursor-pointer"
            >
              Table Manager
            </div>
            <div
              onClick={() => setShowColumnSettings(!showColumnSettings)}
              className="w-fit ml-auto text-end text-lg text-green cursor-pointer hover:shadow-green hover:shadow-md border border-green rounded p-2"
            >
              Column Settings
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
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead className="sticky top-0 z-10 bg-gray-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const column = columnsData.find(
                      (col) => col.accessorKey === header.column.id
                    );
                    return (
                      <th
                        key={header.id}
                        className="p-2 border border-gray-300"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {column && showColumnInfo && (
                          <div className="text-start text-sm font-light">
                            <span className="font-semibold">accessorKey:</span>{" "}
                            {column.accessorKey} <br />
                            <span className="font-semibold">
                              Column Type:
                            </span>{" "}
                            {column.dataType} <br />
                            <span className="font-semibold">
                              Description:
                            </span>{" "}
                            {column.description}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const column = columnsData.find(
                      (col) => col.accessorKey === cell.column.id
                    );
                    const cellValue = cell.getValue();
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    let formattedCellValue: any = cellValue;

                    if (
                      column?.dataType === DataType.DATE &&
                      cellValue instanceof Date
                    ) {
                      formattedCellValue = formatDate(cellValue);
                    }

                    return (
                      <td key={cell.id} className="p-2 border border-gray-300">
                        {flexRender(formattedCellValue, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DataTable;
