import { useModal } from "@/hooks/useModal";

const AddMedicineButton = () => {

    const { onOpen } = useModal();

    return (
        <button onClick={() => onOpen("medicineCreate")} className="bg-indigo-500 hover:bg-indigo-400 transition-all rounded-lg p-2 m-5 text-white font-bold">Add new medicine</button>
    )
}

export default AddMedicineButton