import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

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
        <section className="bg-slate-200 w-[650px] h-[800px] ml-20 rounded-md flex flex-col gap-10 p-3 shadow-2xl shadow-slate-500">
            <Table className="mt-10">
                <h3 className="text-center text-2xl font-bold my-10">Appointments</h3>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold text-black text-center">Date ID</TableHead>
                        <TableHead className="font-bold text-black text-center">Doctor</TableHead>
                        <TableHead className="font-bold text-black text-center">Patient</TableHead>
                        <TableHead className="font-bold text-black text-center">Deparment</TableHead>
                        <TableHead className="font-bold text-black text-center">Cost</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {citas.map((cita) => (
                        <TableRow key={cita.dateID}>
                            <TableCell className="text-center">{cita.dateID}</TableCell>
                            <TableCell className="text-center">{cita.doctor}</TableCell>
                            <TableCell className="text-center">{cita.patient}</TableCell>
                            <TableCell className="text-center">{cita.deparment}</TableCell>
                            <TableCell className="text-center">${cita.cost}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </section>
    )
}
