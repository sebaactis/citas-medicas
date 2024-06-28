import { DonutChart } from '@tremor/react';


const data = [
  { name: 'Cardioly', amount: 503 },
  { name: 'Brain', amount: 205 },
  { name: 'General', amount: 211 },
  { name: 'Children', amount: 1253, },
];


export default function DonutsChart() {
  return (
    <>
      <h3 className="text-center ml-10 mr-10 text-2xl font-black mt-5 text-tremor-content-strong dark:text-dark-tremor-content-strong">
        TOTAL APPOINTMENTS BY DEPARTMENT
      </h3>
      <DonutChart
        className="mt-8"
        data={data}
        category="amount"
        index="name"
        showTooltip={true}
        colors={['red-700', 'red-400', 'red-300', 'red-950', 'yellow']}
      />
    </>
  );

}
