"use client";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columnsData } from "../data/columnsData";
import useDataTable from "../hooks/useDataTable";
import useUsers from "../hooks/useUsers";
import Chart from "./ChartView";
import FiltersSideBar from "./FiltersSideBar";
import NavBar from "./NavBar";
import TableView from "./TableView";

const HomePage = () => {
  const {
    toggleView,
    setToggleView,
    showColumnSettings,
    setShowColumnSettings,
    showColumnInfo,
    setShowColumnInfo,
    columnVisibility,
    setColumnVisibility,
    filters,
    handleFilterChange,
  } = useDataTable();

  const { data: users = [], isLoading } = useUsers(filters);

  const table = useReactTable({
    data: users,
    columns: columnsData,
    state: { columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex gap-4 my-5">
      <FiltersSideBar filters={filters} onFilterChange={handleFilterChange} />
      <div className="w-full flex flex-col gap-4">
        <NavBar
          toggleView={toggleView}
          setToggleView={setToggleView}
          showColumnSettings={showColumnSettings}
          setShowColumnSettings={setShowColumnSettings}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          showColumnInfo={showColumnInfo}
          setShowColumnInfo={setShowColumnInfo}
        />
        {isLoading ? (
          <p className="text-center">Loading data...</p>
        ) : toggleView === "Table" ? (
          <TableView
            table={table}
            showColumnInfo={showColumnInfo}
            columnsData={columnsData}
          />
        ) : (
          <Chart users={users} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
