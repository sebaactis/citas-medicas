import CreateMedicineModal from "@/components/modals/create-medicine-modal"
import DeleteAppointmentModal from "@/components/modals/delete-appointment-modal"
import DeleteDeparmentModal from "@/components/modals/delete-department-modal"
import DeleteDoctorModal from "@/components/modals/delete-doctor-modal"
import DeleteMedicineModal from "@/components/modals/delete-medicine-modal"
import DeletePatientModal from "@/components/modals/delete-patient-modal"
import DeleteSpecialityModal from "@/components/modals/delete-speciality-modal"
import AppointmentDetailsModal from "@/components/modals/details-appointment-modal"
import DeparmentDetailsModal from "@/components/modals/details-department-modal"
import DoctorDetailsModal from "@/components/modals/details-doctor-modal"
import MedicineDetailsModal from "@/components/modals/details-medicine-modal"
import PatientDetailsModal from "@/components/modals/details-patient-modal"
import SpecialityDetailsModal from "@/components/modals/details-speciality-modal"
import EditAppointmentModal from "@/components/modals/edit-appointment-modal"
import EditDeparmentModal from "@/components/modals/edit-department-modal"
import EditDoctorModal from "@/components/modals/edit-doctor-modal"
import EditMedicineModal from "@/components/modals/edit-medicine-modal"
import EditPatientModal from "@/components/modals/edit-patient-modal"
import EditSpecialityModal from "@/components/modals/edit-speciality-modal"

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
            <DoctorDetailsModal />
            <EditDoctorModal />
            <DeleteDoctorModal />
            <SpecialityDetailsModal />
            <EditSpecialityModal />
            <DeleteSpecialityModal />
            <PatientDetailsModal />
            <EditPatientModal />
            <DeletePatientModal />
            <AppointmentDetailsModal />
            <EditAppointmentModal />
            <DeleteAppointmentModal />
        </>
    )
}