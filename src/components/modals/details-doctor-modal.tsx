import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/useModal"
import { useEffect, useState } from "react";
import type { DoctorWithRelations } from "@/lib/types";
import Spinner from "../Spinner";

const DoctorDetailsModal = () => {

    const [doctor, setDoctor] = useState<DoctorWithRelations>();
    const [loading, setLoading] = useState<boolean>(false);

    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "doctorDetails"
    const { id } = data;

    const handleClose = () => {
        onClose();
    }

    const GetDetails = async (doctorId: string) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:4321/api/doctor/${doctorId}`);

            if (!response.ok) {
                throw new Error("Response error");
            }

            await new Promise(resolve => setTimeout(resolve, 500))

            const details = await response.json();

            setDoctor(details);
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
                        {doctor !== undefined &&
                            <>
                                {!loading && <div className="flex flex-col gap-4">
                                    <p className="font-bold dark:text-white"> Doctor ID: </p> <span>{doctor.id}</span>
                                    <p className="font-bold dark:text-white"> Doctor Name: </p> <span>{doctor.name}</span>
                                    <p className="font-bold dark:text-white"> Department ID: </p> <span>{doctor.departmentId}</span>
                                    <p className="font-bold dark:text-white"> Department Name </p> <span>{doctor.department.name}</span>
                                    <p className="font-bold dark:text-white"> Speciality ID: </p> <span>{doctor.specialtieId}</span>
                                    <p className="font-bold dark:text-white"> Speciality Name: </p> <span>{doctor.specialtie.name}</span>
                                </div>}
                            </>

                        }
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default DoctorDetailsModal