import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/useModal"
import { useEffect, useState } from "react";
import type { AppointmentWithRelations } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Spinner from "../Spinner";

const AppointmentDetailsModal = () => {

    const [appointment, setAppointment] = useState<AppointmentWithRelations>();
    const [loading, setLoading] = useState<boolean>(false);

    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "appointmentDetails"
    const { id } = data;

    const handleClose = () => {
        onClose();
    }

    const GetDetails = async (appointmentId: string) => {
        try {
            setLoading(true);
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

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="dark:text-white">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl pb-2">Details</DialogTitle>
                    <DialogDescription>
                        {loading && <Spinner />}
                        {appointment !== undefined &&
                            <>
                                {!loading && <div className="flex flex-col gap-4">
                                    <p className="font-bold dark:text-white"> Appointment ID: </p> <span>{appointment.id}</span>
                                    <p className="font-bold dark:text-white"> Date: </p> <span>{formatDate(appointment.date.toString())}</span>
                                    <p className="font-bold dark:text-white"> Doctor ID: </p> <span>{appointment.doctorId}</span>
                                    <p className="font-bold dark:text-white"> Doctor Name: </p> <span>{appointment.Doctor.name}</span>
                                    <p className="font-bold dark:text-white"> Patient ID: </p> <span>{appointment.patientId}</span>
                                    <p className="font-bold dark:text-white"> Patient Name: </p> <span>{appointment.patient.name}</span>
                                </div>}
                            </>
                        }
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AppointmentDetailsModal