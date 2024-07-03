import { XAxis, Tooltip, YAxis, BarChart, Bar } from 'recharts';

const data =
  [
    { "date": '21-06-2024', "Cantidad": 15 },
    { "date": '22-06-2024', "Cantidad": 23 },
    { "date": '23-06-2024', "Cantidad": 24 },
    { "date": '24-06-2024', "Cantidad": 25 },
    { "date": '25-06-2024', "Cantidad": 12 },
    { "date": '26-06-2024', "Cantidad": 54 },
    { "date": '27-06-2024', "Cantidad": 44 },
    { "date": '28-06-2024', "Cantidad": 143 },
  ];

export default function Example() {

  return (
    <>
      <h3 className="text-center ml-10 mr-10 text-2xl font-black mt-5 text-tremor-content-strong dark:text-dark-tremor-content-strong">
        PATIENTS FOR DATE
      </h3>
      <BarChart width={700} height={300} data={data} >
        <XAxis dataKey="date" tick={{ fill: "black" }} />
        <YAxis padding={{ bottom: 2 }} tick={{ fill: "black" }} />
        <Tooltip />
        <Bar dataKey="Cantidad" fill="#006287" />
      </BarChart>
    </>
  );
}