import CreateMedicineModal from "@/components/modals/create-medicine-modal"
import DeleteDeparmentModal from "@/components/modals/delete-department-modal"
import DeleteMedicineModal from "@/components/modals/delete-medicine-modal"
import DeparmentDetailsModal from "@/components/modals/details-department-modal"
import MedicineDetailsModal from "@/components/modals/details-medicine-modal"
import EditDeparmentModal from "@/components/modals/edit-department-modal"
import EditMedicineModal from "@/components/modals/edit-medicine-modal"

export const ModalProvider = () => {

    return (
        <>
            <MedicineDetailsModal />
            <EditMedicineModal />
            <DeleteMedicineModal />
            <CreateMedicineModal />
            <DeparmentDetailsModal />
            <EditDeparmentModal />
            <DeleteDeparmentModal />
        </>
    )
}