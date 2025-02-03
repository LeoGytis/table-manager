import { User } from "../usersData";

interface ColumnSettingsProps {
  columnVisibility: Record<keyof User, boolean>;
  setColumnVisibility: (newVisibility: Record<keyof User, boolean>) => void;
}

export const ColumnSettings = ({
  columnVisibility,
  setColumnVisibility,
}: ColumnSettingsProps) => {
  return (
    <div className="border p-4">
      <h3>Column Settings</h3>
      {Object.keys(columnVisibility).map((columnKey) => {
        const key = columnKey as keyof User;

        return (
          <div key={key}>
            <label>
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
              {key}
            </label>
          </div>
        );
      })}
    </div>
  );
};
