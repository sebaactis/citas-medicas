import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/useModal"
import { useEffect, useState } from "react";
import { type Medicine } from "@prisma/client";
import { toast } from 'sonner'
import Spinner from "../Spinner";

const EditMedicineModal = () => {

    const [medicine, setMedicine] = useState<Medicine | null>();
    const [loading, setLoading] = useState<boolean>(false);

    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "medicineEdit"
    const { id } = data;

    const GetDetails = async (medicineId: string) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:4321/api/medicine/${medicineId}`);

            if (!response.ok) {
                throw new Error("Response error");
            }

            await new Promise(resolve => setTimeout(resolve, 500))

            const details = await response.json();
            setMedicine(details);
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
        setMedicine(prevState => prevState ? { ...prevState, [e.target.name]: e.target.value } : null);
    }

    const handleUpdate = async (medicineId: string) => {

        try {

            const response = await fetch(`http://localhost:4321/api/medicine/${medicineId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(medicine)
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
                    <DialogTitle className="text-center text-2xl pb-2">Edit Medicine</DialogTitle>
                    <DialogDescription>
                        {loading && <Spinner />}
                        {medicine !== undefined &&
                            <>
                                {!loading && <div className="flex flex-col gap-2">
                                    {medicine !== null &&
                                        <div className="flex flex-col gap-2 items-center">
                                            <label htmlFor="name" className="font-bold w-full">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={medicine.name}
                                                onChange={handleChange}
                                                className="bg-slate-200 dark:bg-slate-700 dark:text-white p-2 rounded-md text-black w-full"
                                            />
                                            <label htmlFor="name" className="font-bold w-full">Price</label>
                                            <input
                                                type="text"
                                                name="price"
                                                value={medicine.price.toString()}
                                                onChange={handleChange}
                                                className="bg-slate-200 dark:bg-slate-700 dark:text-white p-2 rounded-md text-black w-full"
                                            />
                                            <button className="mt-3 bg-green-600 px-4 py-2.5 hover:bg-green-500 transition-all text-white rounded-lg font-bold" onClick={() => handleUpdate(medicine.id)}>Save</button>
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

export default EditMedicineModal