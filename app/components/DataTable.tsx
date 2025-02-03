"use client";
import { formatDate } from "@/lib/utils";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { columnsData, DataType } from "../columnsData";
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

  const filteredData = useMemo(() => {
    return usersData.filter((user) => {
      const firstNameMatch = user.firstName
        .toLowerCase()
        .includes((filters.firstName as string).toLowerCase());
      const lastNameMatch = user.lastName
        .toLowerCase()
        .includes((filters.lastName as string).toLowerCase());
      const emailMatch = user.email
        .toLowerCase()
        .includes((filters.email as string).toLowerCase());

      const ageMatch =
        Array.isArray(filters.age) &&
        user.age >= (filters.age as number[])[0] &&
        user.age <= (filters.age as number[])[1];

      const startDateMatch =
        !filters.startDate ||
        new Date(user.startDate) >= new Date(filters.startDate as string);
      const endDateMatch =
        !filters.endDate ||
        new Date(user.endDate) <= new Date(filters.endDate as string);

      return (
        firstNameMatch &&
        lastNameMatch &&
        emailMatch &&
        ageMatch &&
        startDateMatch &&
        endDateMatch
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
        />
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} className="p-2 border border-gray-300">
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
      </div>
    </div>
  );
};

export default DataTable;
