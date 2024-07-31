import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Details, Edit, X } from "../Icons"
import { useEffect, useState } from "react";
import type { DoctorWithRelations } from "@/lib/types";
import { useModal } from "@/hooks/useModal";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import TableSkeleton from "../TableSleketon";

export default function DoctorsList() {

    const [doctors, setDoctors] = useState<DoctorWithRelations[]>();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { onOpen } = useModal();

    const getDoctors = async (page = 1, limit = 6, pagination = true) => {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:4321/api/doctor/doctors?page=${page}&limit=${limit}&pagination=${pagination}`)
            const data = await response.json();
            setDoctors(data.doctors);
            setTotalPages(data.totalPages);

        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getDoctors(currentPage);
    }, [currentPage])

    return (
        <section className="bg-slate-100/90 dark:bg-slate-600/95 w-[20.625rem] xl:w-[35rem] 2xl:w-[43.625rem] h-[34.375rem] xl:h-[42rem] 2xl:h-[50rem] rounded-md shadow-2xl shadow-slate-500 dark:shadow-slate-700 ml-8 md:ml-20">
            <h3 className="text-center text-2xl font-bold my-10 dark:text-white">DOCTORS</h3>

            {isLoading && <TableSkeleton />}
            {
                !isLoading && <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-bold text-black dark:text-white text-center">Name</TableHead>
                            <TableHead className="font-bold text-black dark:text-white text-center">Department</TableHead>
                            <TableHead className="font-bold text-black dark:text-white text-center">Speciality</TableHead>
                            <TableHead className="font-bold text-black dark:text-white pl-14">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {doctors !== undefined && doctors.map(({ id, name, department, specialtie }) => (
                            <TableRow key={id}>
                                <TableCell className="text-center dark:text-white">{name}</TableCell>
                                <TableCell className="text-center dark:text-white">{department?.name}</TableCell>
                                <TableCell className="text-center dark:text-white">{specialtie?.name}</TableCell>
                                <TableCell className="flex gap-2">
                                    <button onClick={() => onOpen("doctorDetails", { id })} className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 transition-all px-1.5 py-1 rounded-md text-white">
                                        <Details />
                                    </button>
                                    <button onClick={() => onOpen("doctorEdit", { id })} className="bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 transition-all px-1.5 py-1 rounded-md text-white">
                                        <Edit />
                                    </button>
                                    <button onClick={() => onOpen("doctorDelete", { id })} className="bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 transition-all px-1.5 py-1 rounded-md text-white">
                                        <X />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            }

            <div className="mt-7 xl:mt-10">
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