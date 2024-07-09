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

const MedicineDetailsModal = () => {

    const [medicine, setMedicine] = useState<Medicine>();
    const [loading, setLoading] = useState<boolean>(false);

    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "medicineDetails"
    const { id } = data;

    const handleClose = () => {
        onClose();
    }

    const GetDetails = async (medicineId: string) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:4321/api/medicine/${medicineId}`);

            if (!response.ok) {
                throw new Error("Response error");
            }

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

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="dark:text-white">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl pb-2">Details</DialogTitle>
                    <DialogDescription>
                        {loading && <p>Loading...</p>}
                        {medicine !== undefined &&
                            <div className="flex flex-col gap-2">
                                <p className="font-bold dark:text-white"> Medicine ID: </p> <span>{medicine.id}</span>
                                <p className="font-bold dark:text-white"> Name: </p> <span>{medicine.name}</span>
                                <p className="font-bold dark:text-white"> Price: </p> <span>${medicine.price.toString()}</span>
                            </div>
                        }
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default MedicineDetailsModal