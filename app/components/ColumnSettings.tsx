import { columnsData } from "../data/columnsData";
import { UserProps } from "../data/usersData";

interface ColumnSettingsProps {
  columnVisibility: Record<keyof UserProps, boolean>;
  setColumnVisibility: (
    newVisibility: Record<keyof UserProps, boolean>
  ) => void;
  showColumnInfo: boolean;
  setShowColumnInfo: (value: boolean) => void;
}

export const ColumnSettings = ({
  columnVisibility,
  setColumnVisibility,
  showColumnInfo,
  setShowColumnInfo,
}: ColumnSettingsProps) => {
  return (
    <div className="flex flex-col gap-6 p-4 pb-0">
      <div className="grid grid-cols-3 gap-4">
        {Object.keys(columnVisibility).map((columnKey) => {
          const key = columnKey as keyof UserProps;
          const column = columnsData.find((col) => col.accessorKey === key);
          return (
            <div
              key={key}
              className="flex gap-4 border border-green rounded pl-4 py-2"
            >
              <input
                type="checkbox"
                checked={columnVisibility[key]}
                onChange={() => {
                  setColumnVisibility({
                    ...columnVisibility,
                    [key]: !columnVisibility[key],
                  });
                }}
                className="peer checked:accent-green"
              />
              {column && (
                <div className="text-gray-400 peer-checked:text-white">
                  <span>
                    <strong>Name:</strong> {column.header} <br />
                    <strong>Accessor Key:</strong> {column.accessorKey} <br />
                    <strong>Type:</strong> {column.dataType} <br />
                    <strong>Description:</strong> {column.description}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={showColumnInfo}
          onChange={(e) => setShowColumnInfo(e.target.checked)}
          className="checked:accent-green"
        />
        <span>Show detailed column information</span>
      </div>
    </div>
  );
};
