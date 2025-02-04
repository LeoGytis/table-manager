import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const useDataTable = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [toggleView, setToggleView] = useState<"Table" | "Chart">("Table");
  const [showColumnSettings, setShowColumnSettings] = useState(false);
  const [showColumnInfo, setShowColumnInfo] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({
    firstName: true,
    lastName: true,
    email: true,
    age: true,
    startDate: true,
    projectsCount: true,
  });

  const [filters, setFilters] = useState<
    Record<string, string | number | number[]>
  >(() => {
    const params = new URLSearchParams(searchParams.toString());
    return {
      firstName: params.get("firstName") || "",
      lastName: params.get("lastName") || "",
      email: params.get("email") || "",
      age: params.get("age")
        ? JSON.parse(params.get("age") as string)
        : [0, 100],
      startDate: params.get("startDate") || "",
      projectsCount: params.get("projectsCount")
        ? Number(params.get("projectsCount"))
        : "",
    };
  });

  const updateURLParams = useCallback(
    (newFilters: Record<string, string | number | number[]>) => {
      const params = new URLSearchParams();

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== "" && value !== undefined) {
          params.set(
            key,
            typeof value === "object" ? JSON.stringify(value) : String(value)
          );
        }
      });

      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  const handleFilterChange = (
    newFilters: Record<string, string | number | number[]>
  ) => {
    if (newFilters.projectsCount === "") delete newFilters.projectsCount;

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return {
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
  };
};

export default useDataTable;
