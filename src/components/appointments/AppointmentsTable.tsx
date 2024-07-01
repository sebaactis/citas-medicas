import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const citas = [
    {
        dateID: "INV001",
        doctor: "Pedro Rodriguez",
        patient: "Sebastian Actis",
        deparment: "General",
        cost: "0"
    },
    {
        dateID: "INV001",
        doctor: "Pedro Rodriguez",
        patient: "Sebastian Actis",
        deparment: "General",
        cost: "0"
    },
    {
        dateID: "INV001",
        doctor: "Pedro Rodriguez",
        patient: "Sebastian Actis",
        deparment: "General",
        cost: "0"
    }

]

export function AppointmentsTable() {
    return (
        <section className="bg-slate-200 w-[650px] h-[800px] ml-20 rounded-md flex p-3">
            <Table className="mt-10">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Date ID</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Deparment</TableHead>
                        <TableHead>Cost</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {citas.map((cita) => (
                        <TableRow key={cita.dateID}>
                            <TableCell className="font-medium">{cita.dateID}</TableCell>
                            <TableCell>{cita.doctor}</TableCell>
                            <TableCell>{cita.patient}</TableCell>
                            <TableCell className="text-right">{cita.deparment}</TableCell>
                            <TableCell className="text-right">{cita.cost}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                </TableFooter>
            </Table>
        </section>
    )
}
