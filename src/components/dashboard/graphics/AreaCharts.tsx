import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useThemeStore from "@/stores/themeStore";

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

     const { darkMode } = useThemeStore();

    return (
        <>
            <h3 className="text-center ml-10 mr-10 text-2xl font-black mt-5 pb-5 dark:text-white">
                APPOINTMENTS EVOLUTION
            </h3>
            <ResponsiveContainer width="90%" height={300}>
                <AreaChart data={data}>
                    <XAxis dataKey="date" tick={{ fill: darkMode ? 'white' : 'black', fontWeight: "600" }} />
                    <YAxis dataKey="Appointments" tick={{ fill: darkMode ? 'white' : 'black', fontWeight: "600" }} />
                    <Tooltip />
                    <CartesianGrid strokeDasharray="1 1" />
                    <Area type="monotone" dataKey="Appointments" stroke="#75002B" fill="none" strokeWidth={3} />
                </AreaChart>
            </ResponsiveContainer>
        </>
    );
}