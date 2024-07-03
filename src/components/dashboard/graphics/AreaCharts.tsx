import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

const data = [
    {
        "date": 'Jan 23',
        Appointments: 12424,
    },
    {
        "date": 'Feb 23',
        Appointments: 1245,
    },
    {
        "date": 'Mar 23',
        Appointments: 2325,
    },
    {
        "date": 'Abr 23',
        Appointments: 1675,
    },
    {
        "date": 'May 23',
        Appointments: 10503,
    },
    {
        "date": 'Jun 23',
        Appointments: 10000,
    },
];

export default function Example() {
    return (
        <>
            <h3 className="text-center ml-10 mr-10 text-2xl font-black mt-5 text-tremor-content-strong dark:text-dark-tremor-content-strong">
                APPOINTMENTS EVOLUTION
            </h3>
            <AreaChart width={450} height={250} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis padding={{ left: 2  }} dataKey="date" />
                <YAxis dataKey="Appointments"/>
                <Tooltip />
                <Area type="monotone" dataKey="Appointments" stroke="#006287" fillOpacity={1} fill="#006287" />
            </AreaChart>
        </>
    );
}