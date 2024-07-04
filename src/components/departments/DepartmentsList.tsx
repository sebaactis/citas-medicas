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

const deparments = [
    {
        name: "Cardilogy",
    },
    {
        name: "Cardilogy",
    },
    {
        name: "Cardilogy",
    },
    {
        name: "Cardilogy",
    },
    {
        name: "Cardilogy",
    },
]

export default function DeparmentsList() {
    return (
        <section className="bg-slate-100/90 dark:bg-slate-600/95 w-[20.625rem] 2xl:w-[40.625rem] h-[34.375rem] 2xl:h-[50rem] rounded-md shadow-2xl shadow-slate-500 dark:shadow-slate-700 ml-8 md:ml-20">
            <Table className="mt-10">
                <h3 className="text-center text-2xl font-bold my-10 dark:text-white">DEPARTMENTS</h3>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold text-black dark:text-white text-center">Name</TableHead>
                        <TableHead className="font-bold text-black dark:text-white">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {deparments.map((deparment) => (
                        <TableRow key={deparment.name}>
                            <TableCell className="text-center dark:text-white">{deparment.name}</TableCell>
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

            <div className="mt-5">
                <Pagination className="dark:text-white pb-5">
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