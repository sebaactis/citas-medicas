import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/useModal"
import { useState } from "react";
import { toast } from 'sonner'

interface MedicineCreate {
    name: string
    price: number;
}

const CreateMedicineModal = () => {

    const [medicine, setMedicine] = useState<MedicineCreate | null>({ name: "Medicine name", price: 0 });
    const [loading, setLoading] = useState<boolean>(false);

    const { isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === "medicineCreate"

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMedicine(prevState => prevState ? { ...prevState, [e.target.name]: e.target.value } : null);
    }

    const handleCreate = async () => {

        setLoading(true);
        try {

            const response = await fetch(`http://localhost:4321/api/medicine/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(medicine)
            })

            if (response.status === 201) {
                toast.success("Medicine created successfully!", {
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

                return;
            }

            toast.error("Error at create the medicine, please verify!", {
                classNames: {
                    toast: 'bg-red-700 border-red-700',
                    title: 'text-white',
                    icon: 'text-white'
                }
            });

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
                    <DialogTitle className="text-center text-2xl pb-2">Create Medicine</DialogTitle>
                    <DialogDescription>
                        {loading && "Enviando..."}
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-2 items-center">
                                <label htmlFor="name" className="font-bold w-full">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={medicine?.name}
                                    onChange={handleChange}
                                    className="bg-slate-200 dark:bg-slate-700 dark:text-white p-2 rounded-md text-black w-full"
                                />
                                <label htmlFor="name" className="font-bold w-full">Price</label>
                                <input
                                    type="text"
                                    name="price"
                                    value={medicine?.price}
                                    onChange={handleChange}
                                    className="bg-slate-200 dark:bg-slate-700 dark:text-white p-2 rounded-md text-black w-full"
                                />
                                <button className="mt-3 bg-green-600 px-4 py-2.5 hover:bg-green-500 transition-all text-white rounded-lg font-bold" onClick={() => handleCreate()}>Create</button>
                            </div>

                        </div>

                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CreateMedicineModal