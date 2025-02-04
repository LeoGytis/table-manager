import { formatDate } from "@/lib/utils";
import { flexRender, Table } from "@tanstack/react-table";
import { DataType } from "../data/columnsData";

interface TableViewProps<T> {
  table: Table<T>;
  showColumnInfo: boolean;
  columnsData: {
    accessorKey: string;
    dataType: DataType;
    description?: string;
  }[];
}

const TableView = <T,>({
  table,
  showColumnInfo,
  columnsData,
}: TableViewProps<T>) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead className="sticky top-0 z-10 bg-gray-200">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const column = columnsData.find(
                (col) => col.accessorKey === header.column.id
              );
              return (
                <th key={header.id} className="p-2 border border-gray-300">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {column && showColumnInfo && (
                    <div className="text-start text-sm font-light">
                      <span className="font-semibold">accessorKey:</span>{" "}
                      {column.accessorKey} <br />
                      <span className="font-semibold">Column Type:</span>{" "}
                      {column.dataType} <br />
                      <span className="font-semibold">Description:</span>{" "}
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
  );
};

export default TableView;
