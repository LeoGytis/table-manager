export const ColumnSettings = ({
  columnVisibility,
  setColumnVisibility,
}: {
  columnVisibility: Record<string, boolean>;
  setColumnVisibility: (visibility: Record<string, boolean>) => void;
}) => (
  <div className="p-3 border border-gray-300 rounded">
    <h3 className="mb-2 font-semibold">Manage Columns</h3>
    {Object.keys(columnVisibility).map((col) => (
      <div key={col} className="flex items-center gap-2 mb-1">
        <input
          type="checkbox"
          checked={columnVisibility[col]}
          onChange={(e) =>
            setColumnVisibility({
              ...columnVisibility,
              [col]: e.target.checked,
            })
          }
          className="cursor-pointer"
        />
        <span>{col}</span>
      </div>
    ))}
  </div>
);
