export interface DataRow {
  id: number;
  name: string;
  age: number;
  email: string;
  createdAt: string;
}

export const dummyData: DataRow[] = [
  {
    id: 1,
    name: "Alice Johnson",
    age: 28,
    email: "alice@example.com",
    createdAt: "2024-02-01",
  },
  {
    id: 2,
    name: "Bob Smith",
    age: 34,
    email: "bob@example.com",
    createdAt: "2023-11-15",
  },
  {
    id: 3,
    name: "Charlie Davis",
    age: 40,
    email: "charlie@example.com",
    createdAt: "2022-09-10",
  },
  {
    id: 4,
    name: "David White",
    age: 22,
    email: "david@example.com",
    createdAt: "2023-05-20",
  },
  {
    id: 5,
    name: "Emma Brown",
    age: 30,
    email: "emma@example.com",
    createdAt: "2021-12-30",
  },
];
