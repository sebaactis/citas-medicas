import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Details, Edit, X } from "../Icons";
import { useEffect, useState } from "react";
import { type Department } from "@prisma/client";
import { useModal } from "@/hooks/useModal";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import TableSkeleton from "../TableSleketon";

export default function DepartmentsList() {

    const [departments, setDepartments] = useState<Department[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { onOpen } = useModal();

    const getDepartments = async (page = 1, limit = 6, pagination = true) => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:4321/api/department/departments?page=${page}&limit=${limit}&pagination=${pagination}`);
            const data = await response.json();
            setDepartments(data.departments);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getDepartments(currentPage);
    }, [currentPage]);

    return (
        <section className="bg-slate-100/90 dark:bg-slate-600/95 w-[20.625rem] xl:w-[35rem] 2xl:w-[40.625rem] h-[41.375rem] xl:h-[42rem] 2xl:h-[50rem] rounded-md shadow-2xl shadow-slate-500 dark:shadow-slate-700 ml-8 md:ml-20">
            <h3 className="text-center text-2xl font-bold mt-10 dark:text-white">DEPARTMENTS</h3>
            {isLoading && <TableSkeleton />}
            {!isLoading && <Table className="mt-10">
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold text-black dark:text-white text-center">Name</TableHead>
                        <TableHead className="font-bold text-black dark:text-white">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {departments.map(({ id, name }) => (

                        <TableRow key={name}>
                            <TableCell className="text-center dark:text-white">{name}</TableCell>
                            <TableCell className="flex gap-2">
                                <button onClick={() => onOpen("deparmentDetails", { id })} className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 transition-all px-1.5 py-1 rounded-md text-white">
                                    <Details />
                                </button>
                                <button onClick={() => onOpen("deparmentEdit", { id })} className="bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 transition-all px-1.5 py-1 rounded-md text-white">
                                    <Edit />
                                </button>
                                <button onClick={() => onOpen("deparmentDelete", { id })} className="bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 transition-all px-1.5 py-1 rounded-md text-white">
                                    <X />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>}

            <div className="mt-7">
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
        </section >
    );
}