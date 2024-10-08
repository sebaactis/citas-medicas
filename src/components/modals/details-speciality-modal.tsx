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
import Spinner from "../Spinner";

const SpecialityDetailsModal = () => {

    const [speciality, setSpeciality] = useState<Specialtie>();
    const [loading, setLoading] = useState<boolean>(false);

    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "specialtyDetails"
    const { id } = data;

    const handleClose = () => {
        onClose();
    }

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

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="dark:text-white">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl pb-2">Details</DialogTitle>
                    <DialogDescription>
                        {loading && <Spinner />}
                        {speciality !== undefined &&
                            <>
                                {!loading && <div className="flex flex-col gap-2">
                                    <p className="font-bold dark:text-white"> Speciality ID: </p> <span>{speciality.id}</span>
                                    <p className="font-bold dark:text-white"> Name: </p> <span>{speciality.name}</span>
                                </div>}
                            </>
                        }
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default SpecialityDetailsModal