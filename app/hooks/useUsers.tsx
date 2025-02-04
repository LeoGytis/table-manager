import { useQuery } from "@tanstack/react-query";
import mockFetchUsers from "../data/mockFetchUsers";

const useUsers = (filters: Record<string, string | number | number[]>) => {
  return useQuery({
    queryKey: ["users", filters],
    queryFn: () => mockFetchUsers(filters),
    staleTime: 30000,
  });
};

export default useUsers;
