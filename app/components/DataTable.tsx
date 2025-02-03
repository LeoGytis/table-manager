"use client";
import { formatDate } from "@/lib/utils";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { columnsData } from "../columnsData";
import { usersData } from "../usersData";
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

  const [filters, setFilters] = useState<Record<string, string>>({
    firstName: "",
    lastName: "",
    email: "",
  });

  // Apply filters to data
  const filteredData = useMemo(() => {
    return usersData.filter((user) => {
      return (
        user.firstName
          .toLowerCase()
          .includes(filters.firstName.toLowerCase()) &&
        user.lastName.toLowerCase().includes(filters.lastName.toLowerCase()) &&
        user.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    });
  }, [filters]);

  const table = useReactTable({
    data: filteredData,
    columns: columnsData,
    state: { columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex gap-4  my-5">
      <Filters onFilterChange={setFilters} />
      <div className="flex flex-col gap-4 mb-3">
        <ColumnSettings
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
        />
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const column = columnsData.find(
                    (col) => col.accessorKey === header.id
                  );
                  return (
                    <th key={header.id} className="p-2 border border-gray-300">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <div className="tooltip">
                        <span className="tooltiptext">
                          <strong>Name:</strong> {column?.header} <br />
                          <strong>accessorKey:</strong> {column?.accessorKey}
                          <br />
                          <strong>Type:</strong> {column?.dataType} <br />
                          <strong>Description:</strong> {column?.description}
                        </span>
                      </div>
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
                  // Check if the column data type is Date and format accordingly
                  const column = columnsData.find(
                    (col) => col.accessorKey === cell.column.id
                  );
                  const cellValue = cell.getValue();
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  let formattedCellValue: any = cellValue;

                  if (
                    column?.dataType === "date" &&
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
      </div>
    </div>
  );
};

export default DataTable;
