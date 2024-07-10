import { Toaster } from "sonner";
import { Pill, Details, Edit, X } from "../Icons";
import { useModal } from "@/hooks/useModal";

interface MedicineCardProps {
    id: string
    name: string;
    price: string;
    className?: string;
}

const MedicineCard = ({ id, name, price, className }: MedicineCardProps) => {

    const { onOpen } = useModal();

    return (
        <div className={`${className} flex flex-col gap-4 p-5 w-[20rem] col-span-12 md:col-span-4 bg-slate-100/90 dark:bg-slate-600/95 rounded-md shadow-2xl`}>
            <div className="flex justify-between gap-3">
                <div className="p-2 rounded-full bg-indigo-600">
                    <Pill />
                </div>
                <p className="text-xl dark:text-white italic">${price}</p>
            </div>
            <p className="text-2xl font-black dark:text-white">{name}</p>
            <div className="flex gap-2" >
                <button
                    className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 transition-all px-1.5 py-1 rounded-md text-white"
                    onClick={() => onOpen("medicineDetails", { id })}
                >
                    <Details />
                </button>
                <button
                    className="bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 transition-all px-1.5 py-1 rounded-md text-white"
                    onClick={() => onOpen("medicineEdit", { id })}
                >
                    <Edit />
                </button>
                <button
                    className="bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 transition-all px-1.5 py-1 rounded-md text-white"
                    onClick={() => onOpen("medicineDelete", { id })}
                >
                    <X />
                </button>
            </div>
            <Toaster />
        </div>
    );
};

export default MedicineCard;