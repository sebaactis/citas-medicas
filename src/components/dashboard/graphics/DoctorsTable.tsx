import { Card } from "@/components/ui/card"
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
    {
        Doctor: "Malena perez",
        Speciality: "Cardiology",
        Department: "Cardiology",
        Rated: "4.5",
    },
]

export function DoctorsTable() {
    return (
        <Card className="py-[0.45rem]">
            <Table>
                <TableCaption>Top doctors rated</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[18.75rem] font-bold text-lg dark:text-white opacity-85">Doctor</TableHead>
                        <TableHead className="w-[18.75rem] font-bold text-lg dark:text-white opacity-85">Speciality</TableHead>
                        <TableHead className="w-[18.75rem] font-bold text-lg dark:text-white opacity-85">Department</TableHead>
                        <TableHead className="text-right font-bold text-lg dark:text-white opacity-85">Rated</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {doctors.map((doctor) => (
                        <TableRow key={doctor.Doctor}>
                            <TableCell className="text-base dark:text-white">{doctor.Doctor}</TableCell>
                            <TableCell className="text-base dark:text-white">{doctor.Speciality}</TableCell>
                            <TableCell className="text-base dark:text-white">{doctor.Department}</TableCell>
                            <TableCell className="text-center text-base dark:text-white">{doctor.Rated}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    )
}
