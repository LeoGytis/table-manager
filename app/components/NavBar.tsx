// components/NavBar.tsx

import { LuSettings } from "react-icons/lu";
import { ColumnSettings } from "./ColumnSettings";

interface NavBarProps {
  toggleView: "Table" | "Chart";
  setToggleView: React.Dispatch<React.SetStateAction<"Table" | "Chart">>;
  showColumnSettings: boolean;
  setShowColumnSettings: React.Dispatch<React.SetStateAction<boolean>>;
  columnVisibility: Record<string, boolean>;
  setColumnVisibility: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  showColumnInfo: boolean;
  setShowColumnInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar: React.FC<NavBarProps> = ({
  toggleView,
  setToggleView,
  showColumnSettings,
  setShowColumnSettings,
  columnVisibility,
  setColumnVisibility,
  showColumnInfo,
  setShowColumnInfo,
}) => {
  return (
    <div className="bg-blue text-white border border-green rounded p-4">
      <div className="flex justify-between items-center text-green font-semibold">
        <div
          onClick={() => (window.location.href = "/")}
          className="text-2xl cursor-pointer"
        >
          Table Manager
        </div>
        <div className="flex items-center gap-4">
          <div
            className={`cursor-pointer p-2 border rounded ${
              toggleView === "Table" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setToggleView("Table")}
          >
            Table View
          </div>
          <div
            className={`cursor-pointer p-2 border rounded ${
              toggleView === "Chart" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setToggleView("Chart")}
          >
            Chart View
          </div>
          <div
            onClick={() => setShowColumnSettings(!showColumnSettings)}
            className="w-fit ml-auto text-end text-lg text-green cursor-pointer hover:shadow-green hover:shadow-md border border-green rounded p-2"
          >
            <LuSettings />
            Column Settings
          </div>
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
  );
};

export default NavBar;
