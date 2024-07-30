import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/useModal"
import { useEffect, useState } from "react";
import { toast } from 'sonner'
import type { DoctorWithRelations } from "@/lib/types";
import { type Department } from "@prisma/client";

const EditDoctorModal = () => {

    const [doctor, setDoctor] = useState<DoctorWithRelations | null>(null);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [specialities, setSpecialities] = useState<Department[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "doctorEdit"
    const { id } = data;

    const getDoctorDetails = async (doctorId: string) => {
        try {
            const response = await fetch(`http://localhost:4321/api/doctor/${doctorId}`);

            if (!response.ok) {
                throw new Error("Response error");
            }

            const details = await response.json();
            setDoctor(details);

        } catch (err) {
            console.error(err);
        }
    }

    const getDepartments = async (pagination = false) => {
        try {
            const response = await fetch(`http://localhost:4321/api/department/departments?pagination=${pagination}`);
            const data = await response.json();
            setDepartments(data.departments);
        } catch (err) {
            console.error(err)
        }
    };

    const getSpecialities = async (pagination = false) => {
        try {
            const response = await fetch(`http://localhost:4321/api/speciality/specialities?pagination=${pagination}`);
            const data = await response.json();
            setSpecialities(data.specialities);
        } catch (err) {
            console.error(err)
        }
    };

    useEffect(() => {
        if (isModalOpen && id) {
            getDoctorDetails(id);
            getDepartments();
            getSpecialities();
        }
    }, [isModalOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDoctor(prevState => prevState ? { ...prevState, [name]: value } : null);
    }

    const handleUpdate = async (doctorId: string) => {
        try {

            const response = await fetch(`http://localhost:4321/api/doctor/${doctorId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(doctor)
            })

            const jsonResponse = await response.json();

            toast.success(jsonResponse.message, {
                classNames: {
                    toast: 'bg-green-700 border-green-700',
                    title: 'text-white',
                    icon: 'text-white'
                }
            });

            setTimeout(() => {
                onClose();
                window.location.reload();
            }, 1200)

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const handleClose = () => {
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="dark:text-white">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl pb-2">Edit Doctor</DialogTitle>
                    <DialogDescription>
                        {loading && "Enviando..."}
                        {doctor !== undefined &&
                            <div className="flex flex-col gap-2">
                                {doctor !== null &&
                                    <div className="flex flex-col gap-4 items-center">
                                        <label htmlFor="name" className="font-bold w-full">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={doctor.name}
                                            onChange={handleChange}
                                            className="bg-slate-200 dark:bg-slate-700 dark:text-white p-2 rounded-md text-black w-full"
                                        />

                                        <label htmlFor="departmentId" className="font-bold w-full">Department</label>
                                        <select name="departmentId" value={doctor.departmentId} onChange={handleChange} className="bg-slate-200 dark:bg-slate-700 dark:text-white p-2 rounded-md text-black w-full">
                                            {departments.map((department) => (
                                                <option key={department.id} value={department.id}>
                                                    {department.name}
                                                </option>
                                            ))}
                                        </select>

                                        <label htmlFor="specialtieId" className="font-bold w-full">Speciality</label>
                                        <select name="specialtieId" value={doctor.specialtieId} onChange={handleChange} className="bg-slate-200 dark:bg-slate-700 dark:text-white p-2 rounded-md text-black w-full">
                                            {specialities.map((speciality) => (
                                                <option key={speciality.id} value={speciality.id}>
                                                    {speciality.name}
                                                </option>
                                            ))}
                                        </select>

                                        <button className="mt-3 bg-green-600 px-4 py-2.5 hover:bg-green-500 transition-all text-white rounded-lg font-bold" onClick={() => handleUpdate(doctor.id)}>Save</button>
                                    </div>
                                }
                            </div>
                        }
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default EditDoctorModal;
