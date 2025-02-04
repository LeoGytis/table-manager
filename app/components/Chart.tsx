import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { usersData } from "../data/usersData";

const Chart = () => {
  //group projects count with same user age
  const groupedUsersData = usersData.reduce((acc, user) => {
    const existing = acc.find((item) => item.age === user.age);
    if (existing) {
      existing.projectsCount += user.projectsCount;
    } else {
      acc.push({ age: user.age, projectsCount: user.projectsCount });
    }
    return acc;
  }, [] as { age: number; projectsCount: number }[]);

  groupedUsersData.sort((a, b) => a.age - b.age);

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={groupedUsersData}
        margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="age" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="projectsCount" fill="#75c133" barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
