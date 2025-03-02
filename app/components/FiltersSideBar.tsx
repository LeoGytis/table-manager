import React from "react";

interface FiltersSideBarProps {
  filters: Record<string, string | number | number[]>;
  onFilterChange: (filters: Record<string, string | number | number[]>) => void;
}

const FiltersSideBar = ({ filters, onFilterChange }: FiltersSideBarProps) => {
  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = parseInt(e.target.value, 10);
    const newFilters = { ...filters, [field]: value };
    onFilterChange(newFilters);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const newFilters = { ...filters, [field]: e.target.value };
    onFilterChange(newFilters);
  };

  const handleRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    index: number
  ) => {
    const newRange = [...(filters[field] as number[])];
    newRange[index] = parseInt(e.target.value, 10);
    const newFilters = { ...filters, [field]: newRange };
    onFilterChange(newFilters);
  };

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const newFilters = { ...filters, [field]: e.target.value };
    onFilterChange(newFilters);
  };

  return (
    <div className="w-1/5 flex flex-col gap-6 bg-blue text-white border border-green rounded p-4">
      <h3 className="text-xl text-green font-semibold">Filter by:</h3>

      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={filters.firstName as string}
          onChange={(e) => handleInputChange(e, "firstName")}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>

      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value={filters.lastName as string}
          onChange={(e) => handleInputChange(e, "lastName")}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="text"
          value={filters.email as string}
          onChange={(e) => handleInputChange(e, "email")}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>

      <div>
        <label>Age Range:</label>
        <div className="flex gap-6">
          <input
            type="number"
            value={(filters.age as number[])[0].toString()}
            onChange={(e) => handleRangeChange(e, "age", 0)}
            className="mt-1 p-2 w-full border rounded"
          />
          <input
            type="number"
            value={(filters.age as number[])[1].toString()}
            onChange={(e) => handleRangeChange(e, "age", 1)}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
      </div>

      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={filters.startDate as string}
          onChange={(e) => handleDateChange(e, "startDate")}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>

      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={filters.endDate as string}
          onChange={(e) => handleDateChange(e, "endDate")}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>

      <div>
        <label>Projects count:</label>
        <input
          type="number"
          value={(filters.projectsCount as number) || ""}
          onChange={(e) => handleNumberChange(e, "projectsCount")}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
    </div>
  );
};

export default FiltersSideBar;
