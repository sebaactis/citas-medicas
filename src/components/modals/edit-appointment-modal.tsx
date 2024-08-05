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
import type { AppointmentIn, DoctorWithRelations } from "@/lib/types";
import { type Patient } from "@prisma/client";
import { Calendar } from "../ui/calendar";
import Spinner from "../Spinner";

const EditAppointmentModal = () => {

    const [appointment, setAppointment] = useState<AppointmentIn>({
        id: "",
        hour: "",
        date: new Date(),
        patientId: '3f4c7adb-e4ef-4801-9b19-f391a1bbbdb6',
        doctorId: '7b0bd05c-939f-4c22-b1c0-1610a80ffcf3'
    });
    const [doctors, setDoctors] = useState<DoctorWithRelations[]>();
    const [patients, setPatients] = useState<Patient[]>();
    const [loading, setLoading] = useState<boolean>(false);

    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "appointmentEdit"
    const { id } = data;

    const GetDetails = async (appointmentId: string) => {
        try {
            setLoading(true);
            const response = await fetch(`https://citasmedicasdash.netlify.app/api/appointment/${appointmentId}`);

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

    const getDoctors = async (pagination = false) => {
        try {
            const response = await fetch(`https://citasmedicasdash.netlify.app/api/doctor/doctors?pagination=${pagination}`);

            if (!response.ok) {
                throw new Error("Response error");
            }



            const data = await response.json();
            setDoctors(data.doctors);

        } catch (err) {
            console.error(err);
        }
    }

    const getPatients = async (pagination = false) => {
        try {
            const response = await fetch(`https://citasmedicasdash.netlify.app/api/patient/patients?pagination=${pagination}`);
            const data = await response.json();
            setPatients(data.patients);
        } catch (err) {
            console.error(err)
        }
    };


    useEffect(() => {
        if (isModalOpen && id) {
            GetDetails(id);
            getDoctors();
            getPatients();
        }
    }, [isModalOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setAppointment((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleDateChange = (date: any) => {
        setAppointment((prevState) => ({
            ...prevState,
            date
        }))
    }

    const handleUpdate = async (appointmentId: string) => {


        try {

            const response = await fetch(`https://citasmedicasdash.netlify.app/api/appointment/${appointmentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(appointment)
            })


            const jsonResponse = await response.json();

            console.log(jsonResponse);

            toast.success(jsonResponse.message, {
                classNames: {
                    toast: 'bg-green-700 border-green-700',
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
        } finally {
            setLoading(false);
        }
    }

    const handleClose = () => {
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="dark:text-white">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl pb-2">Edit Appointment</DialogTitle>
                    <DialogDescription>
                        {loading && <Spinner />}
                        {appointment !== undefined &&
                            <div className="flex flex-col gap-2">
                                {appointment !== null &&
                                    <>
                                        {!loading && <div className="flex flex-col gap-2 items-center">
                                            <Calendar
                                                mode="single"
                                                selected={appointment.date}
                                                onSelect={handleDateChange}
                                                className="rounded-md border-2 border-slate-300 dark:border-slate-500 p-[-15px] 2xl:p-7"
                                            />
                                            <div className="flex flex-col gap-3 my-4">

                                                <select className="bg-slate-200 dark:bg-slate-700 dark:text-white p-2 rounded-md text-black w-56" name="patientId" value={appointment.patientId} onChange={handleChange}>
                                                    {patients !== undefined && patients.map((patient) => {
                                                        return (
                                                            <option key={patient.id} value={patient.id}>{patient.name}</option>
                                                        )
                                                    })}
                                                </select>

                                                <select className="bg-slate-200 dark:bg-slate-700 dark:text-white p-2 rounded-md text-black w-56" name="doctorId" value={appointment.doctorId} onChange={handleChange}>
                                                    {doctors !== undefined && doctors.map((doctor) => {
                                                        return (
                                                            <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                                                        )
                                                    })}
                                                </select>

                                            </div>
                                            <button onClick={() => handleUpdate(appointment.id)} className="bg-green-500 dark:bg-green-400 px-4 py-2 rounded-md font-black hover:bg-green-400 dark:hover:bg-green-500 transition-all text-black"> SUBMIT </button>
                                        </div>}

                                    </>
                                }
                            </div>
                        }
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default EditAppointmentModal;
