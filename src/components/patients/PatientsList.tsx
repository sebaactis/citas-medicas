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
import type { Patient } from "@prisma/client";
import { useModal } from "@/hooks/useModal";
import { useEffect, useState } from "react";
import TableSkeleton from "../TableSleketon";


export function PatientsList() {

    const [patients, setPatients] = useState<Patient[]>();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { onOpen } = useModal();

    const getPatients = async (page = 1, limit = 6, pagination = true) => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://citasmedicasdash.netlify.app/api/patient/patients?page=${page}&limit=${limit}&pagination=${pagination}`)
            const data = await response.json();
            setPatients(data.patients);
            setTotalPages(data.totalPages);

        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getPatients(currentPage);
    }, [currentPage])

    return (
        <section className="bg-slate-100/90 dark:bg-slate-600/95 w-[20.625rem] md:w-[40.625rem] 2xl:w-[43.75rem] h-[34.375rem] 2xl:h-[50rem] ml-6  rounded-md flex flex-col gap-10 md:p-3 shadow-2xl dark:shadow-slate-700">
            <h3 className="text-center text-2xl font-bold mt-10 dark:text-white uppercase">Patients</h3>
            {isLoading && <TableSkeleton />}
            {!isLoading && <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold text-black dark:text-white text-center">Name</TableHead>
                        <TableHead className="font-bold text-black dark:text-white text-center">Age</TableHead>
                        <TableHead className="font-bold text-black dark:text-white text-center">Email</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {patients !== undefined && patients.map(({ id, name, age, email }) => (
                        <TableRow key={id}>
                            <TableCell className="text-center dark:text-white">{name}</TableCell>
                            <TableCell className="text-center dark:text-white">{age}</TableCell>
                            <TableCell className="text-center dark:text-white">{email}</TableCell>
                            <TableCell className="flex gap-2">
                                <button onClick={() => onOpen("patientDetails", { id })} className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 transition-all px-1.5 py-1 rounded-md text-white">
                                    <Details />
                                </button>
                                <button onClick={() => onOpen("patientEdit", { id })} className="bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 transition-all px-1.5 py-1 rounded-md text-white">
                                    <Edit />
                                </button>
                                <button onClick={() => onOpen("patientDelete", { id })} className="bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 transition-all px-1.5 py-1 rounded-md text-white">
                                    <X />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>}

            <div className="pb-10 md:pb-0">
                <Pagination className="dark:text-white">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink onClick={() => setCurrentPage(index + 1)} isActive={index + 1 === currentPage}>{index + 1}</PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </section>
    )
}

export default PatientsList