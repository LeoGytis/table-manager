import { columnsData } from "../data/columnsData";
import { UserProps } from "../data/usersData";

interface ColumnSettingsProps {
  columnVisibility: Record<keyof UserProps, boolean>;
  setColumnVisibility: (
    newVisibility: Record<keyof UserProps, boolean>
  ) => void;
}

export const ColumnSettings = ({
  columnVisibility,
  setColumnVisibility,
}: ColumnSettingsProps) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Column Settings</h2>
      <div className="grid grid-cols-3 gap-4">
        {Object.keys(columnVisibility).map((columnKey) => {
          const key = columnKey as keyof UserProps;
          const column = columnsData.find((col) => col.accessorKey === key);
          return (
            <div key={key} className="flex gap-4 border pl-4 py-2">
              <input
                type="checkbox"
                checked={columnVisibility[key]}
                onChange={() => {
                  setColumnVisibility({
                    ...columnVisibility,
                    [key]: !columnVisibility[key],
                  });
                }}
              />
              {column && (
                <div>
                  <span>
                    <strong>Name:</strong> {column.header} <br />
                    <strong>accessorKey:</strong> {column.accessorKey} <br />
                    <strong>Type:</strong> {column.dataType} <br />
                    <strong>Description:</strong> {column.description}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
