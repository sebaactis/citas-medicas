import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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
            <ResponsiveContainer width="80%" height={300}>
                <AreaChart data={data}>
                    <XAxis padding={{ left: 2 }} dataKey="date" />
                    <YAxis dataKey="Appointments" />
                    <Tooltip />
                    <CartesianGrid strokeDasharray="1 1" />
                    <Area type="monotone" dataKey="Appointments" stroke="#9E4C4C" fill="none" strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
        </>
    );
}