import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/useModal"
import { useEffect, useState } from "react";
import { type Department} from "@prisma/client";
import { toast } from 'sonner'
import Spinner from "../Spinner";

const EditDeparmentModal = () => {

    const [department, setDepartment] = useState<Department | null>();
    const [loading, setLoading] = useState<boolean>(false);

    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "deparmentEdit"
    const { id } = data;

    const GetDetails = async (deparmentId: string) => {
        setLoading(true);
        try {
            const response = await fetch(`https://citasmedicasdash.netlify.app/api/department/${deparmentId}`);

            if (!response.ok) {
                throw new Error("Response error");
            }

            await new Promise(resolve => setTimeout(resolve, 500))

            const details = await response.json();
            setDepartment(details);
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDepartment(prevState => prevState ? { ...prevState, [e.target.name]: e.target.value } : null);
    }

    const handleUpdate = async (deparmentId: string) => {

        try {

            const response = await fetch(`https://citasmedicasdash.netlify.app/api/department/${deparmentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(department)
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
        }
    }

    const handleClose = () => {
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="dark:text-white">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl pb-2">Edit Deparment</DialogTitle>
                    <DialogDescription>
                        {loading && <Spinner />}
                        {department !== undefined &&
                        <>
                        {!loading && <div className="flex flex-col gap-2">
                                {department !== null &&
                                    <div className="flex flex-col gap-2 items-center">
                                        <label htmlFor="name" className="font-bold w-full">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={department.name}
                                            onChange={handleChange}
                                            className="bg-slate-200 dark:bg-slate-700 dark:text-white p-2 rounded-md text-black w-full"
                                        />
                                        <button className="mt-3 bg-green-600 px-4 py-2.5 hover:bg-green-500 transition-all text-white rounded-lg font-bold" onClick={() => handleUpdate(department.id)}>Save</button>
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

export default EditDeparmentModal