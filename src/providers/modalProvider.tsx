import MedicineDetailsModal from "@/components/modals/details-medicine-modal"
import EditMedicineModal from "@/components/modals/edit-medicine-modal"

export const ModalProvider = () => {

    return (
        <>
            <MedicineDetailsModal />
            <EditMedicineModal />
        </>
    )
}