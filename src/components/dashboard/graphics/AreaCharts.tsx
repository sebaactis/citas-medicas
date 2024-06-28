import { AreaChart, Card, List, ListItem } from '@tremor/react';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

const data = [
    {
        date: 'Jan 23',
        Appointments: 12424,
    },
    {
        date: 'Feb 23',
        Appointments: 1245,
    },
    {
        date: 'Mar 23',
        Appointments: 2325,
    },
    {
        date: 'Abr 23',
        Appointments: 1675,
    },
    {
        date: 'May 23',
        Appointments: 10503,
    },
    {
        date: 'Jun 23',
        Appointments: 10000,
    },
];

export default function Example() {
    return (
        <>
            <h3 className="text-center ml-10 mr-10 text-2xl font-black mt-5 text-tremor-content-strong dark:text-dark-tremor-content-strong">
                APPOINTMENTS EVOLUTION
            </h3>
            <AreaChart
                data={data}
                index="date"
                categories={['Appointments']}
                colors={['green-900']}
                showLegend={true}
                showYAxis={false}
                showGradient={true}
                startEndOnly={true}
                className="mt-6 h-48 p-5"
            />
        </>
    );
}