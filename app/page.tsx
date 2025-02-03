import DataTable from "./components/DataTable";
import { dummyData } from "./dummyData";

const columns = [
  {
    header: "First Name",
    accessorKey: "firstName",
  },
  {
    header: "Last Name",
    accessorKey: "lastName",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Age",
    accessorKey: "age",
  },
];

export default function Home() {
  return (
    <div className="mx-20">
      <DataTable columns={columns} data={dummyData} />
    </div>
  );
}
