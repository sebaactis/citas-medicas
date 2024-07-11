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

const DeparmentDetailsModal = () => {

    const [deparment, setDeparment] = useState<Department>();
    const [loading, setLoading] = useState<boolean>(false);

    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "deparmentDetails"
    const { id } = data;

    const handleClose = () => {
        onClose();
    }

    const GetDetails = async (deparmentId: string) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:4321/api/department/${deparmentId}`);

            if (!response.ok) {
                throw new Error("Response error");
            }

            const details = await response.json();
            setDeparment(details);
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
                        {deparment !== undefined &&
                            <div className="flex flex-col gap-2">
                                <p className="font-bold dark:text-white"> Department ID: </p> <span>{deparment.id}</span>
                                <p className="font-bold dark:text-white"> Name: </p> <span>{deparment.name}</span>
                            </div>
                        }
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default DeparmentDetailsModal