import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/useModal"
import { useEffect, useState } from "react";
import { type Specialtie } from "@prisma/client";
import { toast } from 'sonner'
import Spinner from "../Spinner";

const EditSpecialityModal = () => {

    const [speciality, setSpeciality] = useState<Specialtie | null>();
    const [loading, setLoading] = useState<boolean>(false);

    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "specialtyEdit"
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
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isModalOpen && id) {
            GetDetails(id);
        }
    }, [isModalOpen])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpeciality(prevState => prevState ? { ...prevState, [e.target.name]: e.target.value } : null);
    }

    const handleUpdate = async (specialityId: string) => {

        try {

            const response = await fetch(`https://citasmedicasdash.netlify.app/api/speciality/${specialityId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(speciality)
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
                    <DialogTitle className="text-center text-2xl pb-2">Edit Speciality</DialogTitle>
                    <DialogDescription>
                        {loading && <Spinner />}
                        {speciality !== undefined &&
                            <>
                                {!loading && <div className="flex flex-col gap-2">
                                    {speciality !== null &&
                                        <div className="flex flex-col gap-2 items-center">
                                            <label htmlFor="name" className="font-bold w-full">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={speciality.name}
                                                onChange={handleChange}
                                                className="bg-slate-200 dark:bg-slate-700 dark:text-white p-2 rounded-md text-black w-full"
                                            />
                                            <button className="mt-3 bg-green-600 px-4 py-2.5 hover:bg-green-500 transition-all text-white rounded-lg font-bold" onClick={() => handleUpdate(speciality.id)}>Save</button>
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

export default EditSpecialityModal