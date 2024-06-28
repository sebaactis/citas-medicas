import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const doctors = [
    {
        Doctor: "Roberto Rodriguez",
        Speciality: "Cardiology",
        Department: "Cardiology",
        Rated: "4.8",
    },
    {
        Doctor: "Malena Perez",
        Speciality: "Cardiology",
        Department: "Cardiology",
        Rated: "4.5",
    },
    {
        Doctor: "Malena perez",
        Speciality: "Cardiology",
        Department: "Cardiology",
        Rated: "4.5",
    },
    {
        Doctor: "Malena perez",
        Speciality: "Cardiology",
        Department: "Cardiology",
        Rated: "4.5",
    },
]

export function DoctorsTable() {
    return (
        <Table>
            <TableCaption>Top doctors rated</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[300px] font-bold text-xl">Doctor</TableHead>
                    <TableHead className="w-[300px] font-bold text-xl">Speciality</TableHead>
                    <TableHead className="w-[300px] font-bold text-xl">Department</TableHead>
                    <TableHead className="text-right font-bold text-xl">Rated</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {doctors.map((doctor) => (
                    <TableRow key={doctor.Doctor}>
                        <TableCell className="text-base">{doctor.Doctor}</TableCell>
                        <TableCell className="text-base">{doctor.Speciality}</TableCell>
                        <TableCell className="text-base">{doctor.Department}</TableCell>
                        <TableCell className="text-center text-base">{doctor.Rated}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
