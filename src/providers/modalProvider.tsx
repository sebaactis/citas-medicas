import CreateMedicineModal from "@/components/modals/create-medicine-modal"
import DeleteMedicineModal from "@/components/modals/delete-medicine-modal"
import MedicineDetailsModal from "@/components/modals/details-medicine-modal"
import EditMedicineModal from "@/components/modals/edit-medicine-modal"

export const ModalProvider = () => {

    return (
        <>
            <MedicineDetailsModal />
            <EditMedicineModal />
            <DeleteMedicineModal />
            <CreateMedicineModal />
        </>
    )
}