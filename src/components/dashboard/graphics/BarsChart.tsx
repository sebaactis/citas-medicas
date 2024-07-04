import { XAxis, Tooltip, YAxis, BarChart, Bar, ResponsiveContainer } from 'recharts';

const data =
  [
    { "date": '21-06', "Cantidad": 15 },
    { "date": '22-06', "Cantidad": 23 },
    { "date": '23-06', "Cantidad": 24 },
    { "date": '24-06', "Cantidad": 25 },
    { "date": '25-06', "Cantidad": 12 },
    { "date": '26-06', "Cantidad": 54 },
    { "date": '27-06', "Cantidad": 44 },
    { "date": '28-06', "Cantidad": 143 },
  ];

export default function Example() {

  return (
    <>
      <h3 className="text-center ml-10 mr-10 text-2xl font-black mt-5 dark:text-white">
        PATIENTS FOR DATE
      </h3>
      <ResponsiveContainer width="90%" height="80%" className="mt-2">
        <BarChart data={data} barCategoryGap="20%" barGap={4}>
          <XAxis dataKey="date" tick={{fill: "#C80000", fontWeight: "700", fontSize: "1.1rem"}}  />
          <YAxis padding={{ bottom: 2 }} tick={{fill: "#C80000", fontWeight: "700", fontSize: "1.1rem"}} />
          <Tooltip />
          <Bar dataKey="Cantidad" fill="#C80000" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}