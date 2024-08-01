import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/useModal"
import { useEffect, useState } from "react";
import { type Doctor } from "@prisma/client";
import { toast } from 'sonner'
import type { DoctorWithRelations } from "@/lib/types";
import Spinner from "../Spinner";

const DeleteDoctorModal = () => {

    const [doctor, setDoctor] = useState<DoctorWithRelations | null>();

    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "doctorDelete"
    const [loading, setLoading] = useState(false);
    const { id } = data;

    const GetDetails = async (doctorId: string) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:4321/api/doctor/${doctorId}`);

            if (!response.ok) {
                throw new Error("Response error");
            }

            await new Promise(resolve => setTimeout(resolve, 500))

            const details = await response.json();
            setDoctor(details);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isModalOpen && id) {
            GetDetails(id);
        }
    }, [isModalOpen])

    const handleDelete = async (doctorId: string) => {

        try {
            const response = await fetch(`http://localhost:4321/api/doctor/${doctorId}`, {
                method: "DELETE"
            })

            const jsonResponse = await response.json();

            toast.success(jsonResponse.message, {
                classNames: {
                    toast: 'bg-red-700 border-red-700',
                    title: 'text-white',
                    icon: 'text-white'
                }
            });

            setTimeout(() => {
                onClose();
                window.location.reload();
            }, 1200)

        } catch (err) {
            console.error(err);
        }
    }

    const handleClose = () => {
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="dark:text-white">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl pb-2">Delete Doctor</DialogTitle>
                    <DialogDescription>
                        {loading && <Spinner />}
                        {doctor !== undefined &&
                            <>
                                {!loading && <div className="flex flex-col gap-2">
                                    {doctor !== null &&
                                        <div className="flex flex-col gap-4 items-center">
                                            <p className="py-4 font-bold dark:text-white dark:opacity-85">¿Estás seguro que deseas eliminar el siguiente registro?</p>
                                            <div className="flex flex-col gap-2 bg-slate-200 dark:bg-slate-600 p-6 rounded-md">
                                                <p className="font-bold dark:text-white"> Doctor ID: </p> <span>{doctor.id}</span>
                                                <p className="font-bold dark:text-white"> Doctor Name: </p> <span>{doctor.name}</span>
                                                <p className="font-bold dark:text-white"> Department ID: </p> <span>{doctor.departmentId}</span>
                                                <p className="font-bold dark:text-white"> Department Name </p> <span>{doctor.department.name}</span>
                                                <p className="font-bold dark:text-white"> Speciality ID: </p> <span>{doctor.specialtieId}</span>
                                                <p className="font-bold dark:text-white"> Speciality Name: </p> <span>{doctor.specialtie.name}</span>
                                            </div>
                                            <div className="flex gap-3">
                                                <button className="mt-3 bg-red-600 px-4 py-2.5 hover:bg-red-500 transition-all text-white rounded-lg font-bold" onClick={() => handleDelete(doctor.id)}>Confirm</button>
                                                <button className="mt-3 bg-sky-600 px-4 py-2.5 hover:bg-sky-500 transition-all text-white rounded-lg font-bold" onClick={() => handleClose()}>Cancel</button>
                                            </div>
                                        </div>
                                    }
                                </div>}

                            </>
                        }
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteDoctorModal