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

const DeleteDeparmentModal = () => {

    const [department, setDepartment] = useState<Department | null>();

    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "deparmentDelete"
    const { id } = data;

    const GetDetails = async (departmentId: string) => {
        try {
            const response = await fetch(`http://localhost:4321/api/department/${departmentId}`);

            if (!response.ok) {
                throw new Error("Response error");
            }

            const details = await response.json();
            setDepartment(details);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (isModalOpen && id) {
            GetDetails(id);
        }
    }, [isModalOpen])

    const handleDelete = async (departmentId: string) => {

        try {
            const response = await fetch(`http://localhost:4321/api/department/${departmentId}`, {
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
                        {department !== undefined &&
                            <div className="flex flex-col gap-2">
                                {department !== null &&
                                    <div className="flex flex-col gap-4 items-center">
                                        <p className="py-4 font-bold dark:text-white dark:opacity-85">¿Estás seguro que deseas eliminar el siguiente registro?</p>
                                        <div className="flex flex-col gap-2 bg-slate-200 dark:bg-slate-600 p-6 rounded-md">
                                            <p className="font-bold dark:text-white"> Department ID: </p> <span className="dark:text-slate-300">{department.id}</span>
                                            <p className="font-bold dark:text-white"> Name: </p> <span className="dark:text-slate-300">{department.name}</span>
                                        </div>
                                        <div className="flex gap-3">
                                            <button className="mt-3 bg-red-600 px-4 py-2.5 hover:bg-red-500 transition-all text-white rounded-lg font-bold" onClick={() => handleDelete(department.id)}>Confirm</button>
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

export default DeleteDeparmentModal