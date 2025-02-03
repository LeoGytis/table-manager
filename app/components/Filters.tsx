import React, { useState } from "react";

interface FiltersProps {
  onFilterChange: (filters: Record<string, string>) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<Record<string, string>>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleFilterChange = (field: string, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters); // Pass the updated filters to the parent
  };

  return (
    <div className="w-1/6 p-4 bg-gray-100 border">
      <h3 className="text-xl font-semibold mb-4">Filters</h3>

      <div className="mb-3">
        <label htmlFor="firstName" className="block text-sm font-medium">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          value={filters.firstName}
          onChange={(e) => handleFilterChange("firstName", e.target.value)}
          placeholder="Search by First Name"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="lastName" className="block text-sm font-medium">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          value={filters.lastName}
          onChange={(e) => handleFilterChange("lastName", e.target.value)}
          placeholder="Search by Last Name"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="text"
          value={filters.email}
          onChange={(e) => handleFilterChange("email", e.target.value)}
          placeholder="Search by Email"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default Filters;
