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
import type { Patient } from "@prisma/client";
import Spinner from "../Spinner";

const PatientDetailsModal = () => {

    const [patient, setPatient] = useState<Patient>();
    const [loading, setLoading] = useState<boolean>(false);

    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "patientDetails"
    const { id } = data;

    const handleClose = () => {
        onClose();
    }

    const GetDetails = async (patientId: string) => {
        try {
            setLoading(true);
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
                        {patient !== undefined &&
                            <>
                                {!loading && <div className="flex flex-col gap-2">
                                    <p className="font-bold dark:text-white"> Patient ID: </p> <span>{patient.id}</span>
                                    <p className="font-bold dark:text-white"> Name: </p> <span>{patient.name}</span>
                                    <p className="font-bold dark:text-white"> Age: </p> <span>{patient.age}</span>
                                    <p className="font-bold dark:text-white"> Email: </p> <span>{patient.email}</span>
                                </div>}
                            </>

                        }
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default PatientDetailsModal