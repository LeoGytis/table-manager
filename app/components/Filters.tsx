interface FiltersProps {
  filters: Record<string, string | number | number[]>;
  onFilterChange: (filters: Record<string, string | number | number[]>) => void;
}

const Filters = ({ filters, onFilterChange }: FiltersProps) => {
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

  return (
    <div className="filters">
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
  );
};

export default Filters;
