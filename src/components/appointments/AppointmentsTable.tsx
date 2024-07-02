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

import { Details, Edit, X } from "../Icons"

export function AppointmentsTable() {

    const citas = [
        {
            dateID: "INV001",
            doctor: "Pedro Rodriguez",
            patient: "Sebastian Actis",
            deparment: "General",
            cost: "0"
        },
        {
            dateID: "INV002",
            doctor: "Pedro Rodriguez",
            patient: "Sebastian Actis",
            deparment: "General",
            cost: "0"
        },
        {
            dateID: "INV003",
            doctor: "Pedro Rodriguez",
            patient: "Sebastian Actis",
            deparment: "General",
            cost: "0"
        },
        {
            dateID: "INV004",
            doctor: "Pedro Rodriguez",
            patient: "Sebastian Actis",
            deparment: "General",
            cost: "0"
        },
        {
            dateID: "INV005",
            doctor: "Pedro Rodriguez",
            patient: "Sebastian Actis",
            deparment: "General",
            cost: "0"
        },
        {
            dateID: "INV006",
            doctor: "Pedro Rodriguez",
            patient: "Sebastian Actis",
            deparment: "General",
            cost: "0"
        },
        {
            dateID: "INV007",
            doctor: "Pedro Rodriguez",
            patient: "Sebastian Actis",
            deparment: "General",
            cost: "0"
        }
    ]

    return (
        <section className="bg-slate-100/90 dark:bg-slate-600/95 w-[700px] h-[800px] ml-20 rounded-md flex flex-col gap-10 p-3 shadow-2xl dark:shadow-slate-700">
            <Table className="mt-10">
                <h3 className="text-center text-2xl font-bold my-10 dark:text-white">Appointments</h3>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold text-black dark:text-white text-center">Date ID</TableHead>
                        <TableHead className="font-bold text-black dark:text-white text-center">Doctor</TableHead>
                        <TableHead className="font-bold text-black dark:text-white text-center">Patient</TableHead>
                        <TableHead className="font-bold text-black dark:text-white text-center">Deparment</TableHead>
                        <TableHead className="font-bold text-black dark:text-white text-center">Cost</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {citas.map((cita) => (
                        <TableRow key={cita.dateID}>
                            <TableCell className="text-center dark:text-white">
                                {cita.dateID}
                            </TableCell>
                            <TableCell className="text-center dark:text-white">{cita.doctor}</TableCell>
                            <TableCell className="text-center dark:text-white">{cita.patient}</TableCell>
                            <TableCell className="text-center dark:text-white">{cita.deparment}</TableCell>
                            <TableCell className="text-center dark:text-white">${cita.cost}</TableCell>
                            <TableCell className="flex gap-2">
                                <button className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 transition-all px-1.5 py-1 rounded-md text-white">
                                    <Details />
                                </button>
                                <button className="bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 transition-all px-1.5 py-1 rounded-md text-white">
                                    <Edit />
                                </button>
                                <button className="bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 transition-all px-1.5 py-1 rounded-md text-white">
                                    <X />
                                </button>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div>
                <Pagination className="dark:text-white">
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
        </section >
    )
}
