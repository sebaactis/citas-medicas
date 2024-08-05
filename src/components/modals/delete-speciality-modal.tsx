import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/useModal"
import { useEffect, useState } from "react";
import { type Department } from "@prisma/client";
import { toast } from 'sonner'
import Spinner from "../Spinner";

const DeleteSpecialityModal = () => {

    const [speciality, setSpeciality] = useState<Department | null>();

    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "specialtyDelete"
    const [loading, setLoading] = useState(false);
    const { id } = data;

    const GetDetails = async (specialityId: string) => {
        setLoading(true);
        try {
            const response = await fetch(`https://citasmedicasdash.netlify.app/api/speciality/${specialityId}`);

            if (!response.ok) {
                throw new Error("Response error");
            }

            await new Promise(resolve => setTimeout(resolve, 500))

            const details = await response.json();
            setSpeciality(details);
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

    const handleDelete = async (specialityId: string) => {

        try {
            const response = await fetch(`https://citasmedicasdash.netlify.app/api/speciality/${specialityId}`, {
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
                    <DialogTitle className="text-center text-2xl pb-2">Delete Medicine</DialogTitle>
                    <DialogDescription>
                        {loading && <Spinner />}
                        {speciality !== undefined &&
                            <>
                                {!loading && <div className="flex flex-col gap-2">
                                    {speciality !== null &&
                                        <div className="flex flex-col gap-4 items-center">
                                            <p className="py-4 font-bold dark:text-white dark:opacity-85">¿Estás seguro que deseas eliminar el siguiente registro?</p>
                                            <div className="flex flex-col gap-2 bg-slate-200 dark:bg-slate-600 p-6 rounded-md">
                                                <p className="font-bold dark:text-white"> speciality ID: </p> <span className="dark:text-slate-300">{speciality.id}</span>
                                                <p className="font-bold dark:text-white"> Name: </p> <span className="dark:text-slate-300">{speciality.name}</span>
                                            </div>
                                            <div className="flex gap-3">
                                                <button className="mt-3 bg-red-600 px-4 py-2.5 hover:bg-red-500 transition-all text-white rounded-lg font-bold" onClick={() => handleDelete(speciality.id)}>Confirm</button>
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

export default DeleteSpecialityModal