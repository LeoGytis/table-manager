import { usersData } from "./usersData";

const mockFetchUsers = (
  filters: Record<string, string | number | number[]>
) => {
  return new Promise<typeof usersData>((resolve) => {
    setTimeout(() => {
      const filteredData = usersData.filter((user) => {
        const firstNameMatch = user.firstName
          .toLowerCase()
          .includes((filters.firstName as string).toLowerCase());
        const lastNameMatch = user.lastName
          .toLowerCase()
          .includes((filters.lastName as string).toLowerCase());
        const emailMatch = user.email
          .toLowerCase()
          .includes((filters.email as string).toLowerCase());

        const ageMatch =
          Array.isArray(filters.age) &&
          user.age >= (filters.age as number[])[0] &&
          user.age <= (filters.age as number[])[1];

        const startDateMatch =
          (!filters.startDate && !filters.endDate) ||
          (new Date(user.startDate) >= new Date(filters.startDate as string) &&
            (!filters.endDate ||
              new Date(user.startDate) <=
                new Date(filters.endDate as string))) ||
          (filters.endDate &&
            new Date(user.startDate) <= new Date(filters.endDate as string));

        const projectCountMatch =
          filters.projectsCount === undefined ||
          user.projectsCount === filters.projectsCount;

        return (
          firstNameMatch &&
          lastNameMatch &&
          emailMatch &&
          ageMatch &&
          startDateMatch &&
          projectCountMatch
        );
      });

      resolve(filteredData);
    }, 2000);
  });
};

export default mockFetchUsers;
