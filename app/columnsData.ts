export enum DataType {
  TEXT = "text",
  NUMBER = "number",
  DATE = "date",
}

export interface Column {
  header: string;
  accessorKey: string;
  dataType: DataType;
  description: string;
}
export const dummyColumns: Column[] = [
  {
    header: "First Name",
    accessorKey: "firstName",
    dataType: DataType.TEXT,
    description: "The first name of the user.",
  },
  {
    header: "Last Name",
    accessorKey: "lastName",
    dataType: DataType.TEXT,
    description: "The last name of the user.",
  },
  {
    header: "Email",
    accessorKey: "email",
    dataType: DataType.TEXT,
    description: "The email address of the user.",
  },
  {
    header: "Age",
    accessorKey: "age",
    dataType: DataType.NUMBER,
    description: "The age of the user.",
  },
  {
    header: "Start Date",
    accessorKey: "startDate",
    dataType: DataType.DATE,
    description: "Work starting date.",
  },
  {
    header: "End Date",
    accessorKey: "endDate",
    dataType: DataType.DATE,
    description: "Work ending date.",
  },
];
