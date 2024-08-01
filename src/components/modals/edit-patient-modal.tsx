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
import { type Patient } from "@prisma/client";
import Spinner from "../Spinner";

const EditPatientModal = () => {

    const [patient, setPatient] = useState<Patient | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "patientEdit"
    const { id } = data;

    const getDetails = async (patientId: string) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:4321/api/patient/${patientId}`);

            if (!response.ok) {
                throw new Error("Response error");
            }

            await new Promise(resolve => setTimeout(resolve, 500))

            const details = await response.json();
            setPatient(details);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        if (isModalOpen && id) {
            getDetails(id);
        }
    }, [isModalOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPatient(prevState => prevState ? { ...prevState, [name]: value } : null);
    }

    const handleUpdate = async (patientId: string) => {
        try {

            const response = await fetch(`http://localhost:4321/api/patient/${patientId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(patient)
            })

            const jsonResponse = await response.json();

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
                    <DialogTitle className="text-center text-2xl pb-2">Edit Patient</DialogTitle>
                    <DialogDescription>
                        {loading && <Spinner />}
                        {patient !== undefined &&
                            <>
                                {!loading && <div className="flex flex-col gap-2">
                                    {patient !== null &&
                                        <div className="flex flex-col gap-4 items-center">
                                            <label htmlFor="name" className="font-bold w-full">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={patient.name}
                                                onChange={handleChange}
                                                className="bg-slate-200 dark:bg-slate-700 dark:text-white p-2 rounded-md text-black w-full"
                                            />

                                            <label htmlFor="age" className="font-bold w-full">Age</label>
                                            <input
                                                type="text"
                                                name="age"
                                                value={patient.age}
                                                onChange={handleChange}
                                                className="bg-slate-200 dark:bg-slate-700 dark:text-white p-2 rounded-md text-black w-full"
                                            />

                                            <label htmlFor="email" className="font-bold w-full">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={patient.email}
                                                onChange={handleChange}
                                                className="bg-slate-200 dark:bg-slate-700 dark:text-white p-2 rounded-md text-black w-full"
                                            />

                                            <button className="mt-3 bg-green-600 px-4 py-2.5 hover:bg-green-500 transition-all text-white rounded-lg font-bold" onClick={() => handleUpdate(patient.id)}>Save</button>
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

export default EditPatientModal;
