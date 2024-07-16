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

export default function DoctorsList() {

    const [doctors, setDoctors] = useState<DoctorWithRelations[]>();
    const { onOpen } = useModal();

    const getDoctors = async () => {
        try {

            const response = await fetch("http://localhost:4321/api/doctor/doctors")
            const data = await response.json();
            setDoctors(data);

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getDoctors();
    }, [])

    return (
        <section className="bg-slate-100/90 dark:bg-slate-600/95 w-[20.625rem] 2xl:w-[40.625rem] h-[34.375rem] 2xl:h-[50rem] rounded-md shadow-2xl shadow-slate-500 dark:shadow-slate-700 ml-8 md:ml-20">
            <h3 className="text-center text-2xl font-bold my-10 dark:text-white">DOCTORS</h3>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold text-black dark:text-white text-center">Name</TableHead>
                        <TableHead className="font-bold text-black dark:text-white text-center">Department</TableHead>
                        <TableHead className="font-bold text-black dark:text-white text-center">Speciality</TableHead>
                        <TableHead className="font-bold text-black dark:text-white pl-14">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {doctors !== undefined && doctors.map(({id, name, department, specialtie}) => (
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
                                <button className="bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 transition-all px-1.5 py-1 rounded-md text-white">
                                    <X />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </section>
    )
}