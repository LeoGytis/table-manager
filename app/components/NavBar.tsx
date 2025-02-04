import { FaRegChartBar } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { ColumnSettings } from "./ColumnSettings";

import { CiViewTable } from "react-icons/ci";
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
            className={`cursor-pointer p-2 border border-green rounded ${
              toggleView === "Table"
                ? "text-green"
                : "border-gray-500 text-gray-500"
            }`}
            onClick={() => setToggleView("Table")}
          >
            <CiViewTable />
          </div>
          <div
            className={`cursor-pointer p-2 border border-green rounded ${
              toggleView === "Chart"
                ? "text-green"
                : "border-gray-500 text-gray-500"
            }`}
            onClick={() => setToggleView("Chart")}
          >
            <FaRegChartBar />
          </div>
          <div
            onClick={() => setShowColumnSettings(!showColumnSettings)}
            className="flex items-center gap-2 text-end text-lg text-green cursor-pointer hover:shadow-green hover:shadow-md border border-green rounded p-2"
          >
            <IoMdSettings />
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
