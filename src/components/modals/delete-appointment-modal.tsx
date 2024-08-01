import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/useModal"
import { useEffect, useState } from "react";
import { toast } from 'sonner'
import type { AppointmentWithRelations } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Spinner from "../Spinner";

const DeleteAppointmentModal = () => {

    const [appointment, setAppointment] = useState<AppointmentWithRelations>();

    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "appointmentDelete"
    const [loading, setLoading] = useState(false);
    const { id } = data;

    const GetDetails = async (appointmentId: string) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:4321/api/appointment/${appointmentId}`);

            if (!response.ok) {
                throw new Error("Response error");
            }

            await new Promise(resolve => setTimeout(resolve, 500));

            const details = await response.json();

            setAppointment(details);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isModalOpen && id) {
            GetDetails(id);
        }
    }, [isModalOpen])

    const handleDelete = async (appointmentId: string) => {

        try {
            const response = await fetch(`http://localhost:4321/api/appointment/${appointmentId}`, {
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
                    <DialogTitle className="text-center text-2xl pb-2">Delete Appointment</DialogTitle>
                    <DialogDescription>
                        {loading && <Spinner />}
                        <div className="flex flex-col gap-2">
                            {appointment !== undefined &&
                                <>
                                    {!loading && <div className="flex flex-col gap-4 items-center">
                                        <p className="py-4 font-bold dark:text-white dark:opacity-85">¿Estás seguro que deseas eliminar el siguiente registro?</p>
                                        <div className="flex flex-col gap-4 bg-slate-200 dark:bg-slate-600 p-6 rounded-md">
                                            <p className="font-bold dark:text-white"> Doctor ID: </p> <span>{appointment.id}</span>
                                            <p className="font-bold dark:text-white"> Date: </p> <span>{formatDate(appointment.date.toString())}</span>
                                            <p className="font-bold dark:text-white"> Doctor ID: </p> <span>{appointment.doctorId}</span>
                                            <p className="font-bold dark:text-white"> Doctor Name: </p> <span>{appointment.Doctor.name}</span>
                                            <p className="font-bold dark:text-white"> Patient ID: </p> <span>{appointment.patientId}</span>
                                            <p className="font-bold dark:text-white"> Patient Name: </p> <span>{appointment.patient.name}</span>
                                        </div>

                                        <div className="flex gap-3 items-center">
                                            <button className="mt-3 bg-red-600 px-4 py-2.5 hover:bg-red-500 transition-all text-white rounded-lg font-bold" onClick={() => handleDelete(appointment.id)}>Confirm</button>
                                            <button className="mt-3 bg-sky-600 px-4 py-2.5 hover:bg-sky-500 transition-all text-white rounded-lg font-bold" onClick={() => handleClose()}>Cancel</button>
                                        </div>
                                    </div>}

                                </>
                            }
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteAppointmentModal