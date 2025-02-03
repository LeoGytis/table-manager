"use client";
import { formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { columnsData, DataType } from "../data/columnsData";
import mockFetchUsers from "../data/mockFetchUsers";
import { ColumnSettings } from "./ColumnSettings";
import Filters from "./Filters";

const DataTable = () => {
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({
    firstName: true,
    lastName: true,
    email: true,
    age: true,
    startDate: true,
    endDate: true,
  });

  const [filters, setFilters] = useState<
    Record<string, string | number | number[]>
  >({
    firstName: "",
    lastName: "",
    email: "",
    age: [0, 100],
    startDate: "",
    endDate: "",
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

  const handleFilterChange = (
    newFilters: Record<string, string | number | number[]>
  ) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex gap-4 my-5">
      <Filters filters={filters} onFilterChange={handleFilterChange} />
      <div className="w-full flex flex-col gap-4 mb-3">
        <ColumnSettings
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
        />{" "}
        {isLoading ? (
          <p className="text-center">Loading data...</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        className="p-2 border border-gray-300"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
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
