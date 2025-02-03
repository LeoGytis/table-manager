export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  startDate: Date;
  endDate: Date;
}

export const dummyData: User[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    age: 28,
    startDate: new Date("2020-01-01"),
    endDate: new Date("2023-01-01"),
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    age: 34,
    startDate: new Date("2018-05-15"),
    endDate: new Date("2022-12-30"),
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    age: 25,
    startDate: new Date("2021-09-23"),
    endDate: new Date("2024-09-23"),
  },
  {
    id: 4,
    firstName: "Bob",
    lastName: "Brown",
    email: "bob.brown@example.com",
    age: 40,
    startDate: new Date("2015-06-10"),
    endDate: new Date("2023-11-20"),
  },
];
