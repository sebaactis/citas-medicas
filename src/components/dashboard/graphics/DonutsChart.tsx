import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: 'Cardioly', amount: 503 },
  { name: 'Brain', amount: 205 },
  { name: 'General', amount: 211 },
  { name: 'Children', amount: 1253, },
];

const COLORS = ['#870000', '#FF5757', '#FF0000', '#9E4C4C'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fontSize="12px" fill="white" textAnchor="middle" dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function DonutsChart() {
  return (
    <>
      <h3 className="text-center ml-10 mr-10 text-2xl font-black mt-5 dark:text-white">
        TOTAL APPOINTMENTS BY DEPARTMENT
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie

            data={data}
            cx="50%"
            cy="50%"
            label={renderCustomizedLabel}
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="amount"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );

}
