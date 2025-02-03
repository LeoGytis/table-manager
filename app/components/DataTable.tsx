"use client";
import { formatDate } from "@/lib/utils";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { dummyColumns } from "../columnsData";
import { dummyData } from "../dummyData";
import { ColumnSettings } from "./ColumnSettings";
import { Filters } from "./Filters";

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

  const table = useReactTable({
    data: dummyData,
    columns: dummyColumns,
    state: { columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="my-5">
      <div className="flex justify-between items-center mb-3">
        <Filters />
        <ColumnSettings
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
        />
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const column = dummyColumns.find(
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
                const column = dummyColumns.find(
                  (col) => col.accessorKey === cell.column.id
                );
                const cellValue = cell.getValue();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                let formattedCellValue: any = cellValue;

                if (column?.dataType === "date" && cellValue instanceof Date) {
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
  );
};

export default DataTable;
