import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/useModal"
import { useEffect, useState } from "react";
import { type Patient } from "@prisma/client";
import { toast } from 'sonner'

const DeletePatientModal = () => {

    const [patient, setPatient] = useState<Patient | null>();

    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "patientDelete"
    const { id } = data;

    const GetDetails = async (patientId: string) => {
        try {
            const response = await fetch(`http://localhost:4321/api/patient/${patientId}`);

            if (!response.ok) {
                throw new Error("Response error");
            }

            const details = await response.json();
            setPatient(details);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (isModalOpen && id) {
            GetDetails(id);
        }
    }, [isModalOpen])

    const handleDelete = async (patientId: string) => {

        try {
            const response = await fetch(`http://localhost:4321/api/patient/${patientId}`, {
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
                    <DialogTitle className="text-center text-2xl pb-2">Delete Patient</DialogTitle>
                    <DialogDescription>
                        {patient !== undefined &&
                            <div className="flex flex-col gap-2">
                                {patient !== null &&
                                    <div className="flex flex-col gap-4 items-center">
                                        <p className="py-4 font-bold dark:text-white dark:opacity-85">¿Estás seguro que deseas eliminar el siguiente registro?</p>
                                        <div className="flex flex-col gap-2 bg-slate-200 dark:bg-slate-600 p-6 rounded-md">
                                            <p className="font-bold dark:text-white"> Patient ID: </p> <span className="dark:text-slate-300">{patient.id}</span>
                                            <p className="font-bold dark:text-white"> Name: </p> <span className="dark:text-slate-300">{patient.name}</span>
                                            <p className="font-bold dark:text-white"> Age: </p> <span className="dark:text-slate-300">{patient.age}</span>
                                            <p className="font-bold dark:text-white"> Email: </p> <span className="dark:text-slate-300">{patient.email}</span>

                                        </div>
                                        <div className="flex gap-3">
                                            <button className="mt-3 bg-red-600 px-4 py-2.5 hover:bg-red-500 transition-all text-white rounded-lg font-bold" onClick={() => handleDelete(patient.id)}>Confirm</button>
                                            <button className="mt-3 bg-sky-600 px-4 py-2.5 hover:bg-sky-500 transition-all text-white rounded-lg font-bold" onClick={() => handleClose()}>Cancel</button>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default DeletePatientModal