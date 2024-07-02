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

const pacientes = [
    {
        name: "Silvina Perez",
        deparment: "Cardilogy",
        speciality: "Cardilogy",
    },
    {
        name: "Silvina Perez",
        deparment: "Cardilogy",
        speciality: "Cardilogy",
    },

    {
        name: "Silvina Perez",
        deparment: "Cardilogy",
        speciality: "Cardilogy",
    },

    {
        name: "Silvina Perez",
        deparment: "Cardilogy",
        speciality: "Cardilogy",
    },

    {
        name: "Silvina Perez",
        deparment: "Cardilogy",
        speciality: "Cardilogy",
    }

]

export default function DoctorsList() {
    return (
        <section className="bg-slate-100/90 dark:bg-slate-600/95 w-[650px] h-[800px] ml-20 rounded-md flex flex-col gap-10 p-3 shadow-2xl dark:shadow-slate-700">
            <Table className="mt-10">
                <h3 className="text-center text-2xl font-bold my-10 dark:text-white">DOCTORS</h3>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold text-black dark:text-white text-center">Name</TableHead>
                        <TableHead className="font-bold text-black dark:text-white text-center">Department</TableHead>
                        <TableHead className="font-bold text-black dark:text-white text-center">Speciality</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pacientes.map((doctor) => (
                        <TableRow key={doctor.name}>
                            <TableCell className="text-center dark:text-white">{doctor.name}</TableCell>
                            <TableCell className="text-center dark:text-white">{doctor.deparment}</TableCell>
                            <TableCell className="text-center dark:text-white">{doctor.speciality}</TableCell>
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
        </section>
    )
}