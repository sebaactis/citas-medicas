import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Details, Edit, X } from "../Icons";
import type { AppointmentWithRelations } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import TableSkeleton from "../TableSleketon";


export default function AppointmentsTable() {

    const [appointments, setAppointments] = useState<AppointmentWithRelations[]>();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { onOpen } = useModal();

    const getAppointments = async (page = 1, limit = 6, pagination = true) => {

        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:4321/api/appointment/appointments?page=${page}&limit=${limit}&pagination=${pagination}`)
            const data = await response.json();
            setAppointments(data.appointments);
            setTotalPages(data.totalPages);

        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        getAppointments(currentPage);
    }, [currentPage])

    return (
        <section
            className=" bg-slate-100/90 dark:bg-slate-600/95 w-[20.625rem] md:w-[40.625rem] 2xl:w-[43.75rem] h-[34.375rem] 2xl:h-[50rem] ml-10 2xl:ml-20 rounded-md flex flex-col gap-10 p-3 shadow-2xl dark:shadow-slate-700"
        >
            <h3 className="text-center text-2xl font-bold mt-10 dark:text-white uppercase">
                Appointments
            </h3>
            {isLoading && <TableSkeleton />}
            {!isLoading && <Table >
                <TableHeader>
                    <TableRow>
                        <TableHead
                            className="font-bold text-black dark:text-white text-center"
                        >Date ID
                        </TableHead>
                        <TableHead
                            className="font-bold text-black dark:text-white text-center"
                        >Date
                        </TableHead>
                        <TableHead
                            className="font-bold text-black dark:text-white text-center"
                        >Patient
                        </TableHead>
                        <TableHead
                            className="font-bold text-black dark:text-white text-center"
                        >Doctor
                        </TableHead>
                        <TableHead
                            className="font-bold text-black dark:text-white text-center"
                        >Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appointments !== undefined && appointments.map(({ id, date, patient, Doctor }) => (
                        <TableRow key={id}>
                            <TableCell className="text-center dark:text-white">{id}</TableCell>
                            <TableCell className="text-center w-32 dark:text-white">{formatDate(date.toString())}</TableCell>
                            <TableCell className="text-center dark:text-white">{patient?.name}</TableCell>
                            <TableCell className="text-center dark:text-white">{Doctor?.name}</TableCell>
                            <TableCell className="flex gap-2">
                                <button onClick={() => onOpen("appointmentDetails", { id })} className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 transition-all px-1.5 py-1 rounded-md text-white">
                                    <Details />
                                </button>
                                <button onClick={() => onOpen("appointmentEdit", { id })} className="bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 transition-all px-1.5 py-1 rounded-md text-white">
                                    <Edit />
                                </button>
                                <button onClick={() => onOpen("appointmentDelete", { id })} className="bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 transition-all px-1.5 py-1 rounded-md text-white">
                                    <X />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>}

            <div>
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


