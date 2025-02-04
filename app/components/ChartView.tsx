import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartViewProps {
  users: { age: number; projectsCount: number }[];
}

const ChartView = ({ users }: ChartViewProps) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={users}
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

export default ChartView;
