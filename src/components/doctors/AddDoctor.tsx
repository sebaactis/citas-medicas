import { Input } from "@/components/ui/input"
import type { Department } from "@prisma/client";
import { useState, useEffect } from "react";
import { toast } from "sonner";

type DoctorCreate = {
    name: string
    departmentId: string
    specialtieId: string
}

export default function AddDoctor() {


    const [doctor, setDoctor] = useState<DoctorCreate | null>({ name: "", departmentId: "a0e03d8e-d32d-4b4f-816b-e5f5f9fcc13a", specialtieId: "3bed5b8d-551d-4978-a3d7-c665620ba69a" });
    const [departments, setDepartments] = useState<Department[]>([]);
    const [specialities, setSpecialities] = useState<Department[]>([]);

    const getDepartments = async (pagination = false) => {
        try {
            const response = await fetch(`https://citasmedicasdash.netlify.app/api/department/departments?pagination=${pagination}`);
            const data = await response.json();
            setDepartments(data.departments);
        } catch (err) {
            console.error(err)
        }
    };

    const getSpecialities = async (pagination = false) => {
        try {
            const response = await fetch(`https://citasmedicasdash.netlify.app/api/speciality/specialities?pagination=${pagination}`);
            const data = await response.json();
            setSpecialities(data.specialities);
        } catch (err) {
            console.error(err)
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDoctor(prevState => prevState ? { ...prevState, [name]: value } : null);
    }

    const handleCreate = async (e: any) => {

        e.preventDefault();

        try {
            const response = await fetch("https://citasmedicasdash.netlify.app/api/doctor/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(doctor)
            })

            if (response.status === 201) {
                toast.success("Doctor created successfully!", {
                    classNames: {
                        toast: 'bg-green-700 border-green-700',
                        title: 'text-white',
                        icon: 'text-white'
                    }
                });

                setTimeout(() => {
                    window.location.reload();
                }, 1200)

                return;
            }

            toast.error("Error at create the doctor, please verify!", {
                classNames: {
                    toast: 'bg-red-700 border-red-700',
                    title: 'text-white',
                    icon: 'text-white'
                }
            });
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getDepartments();
        getSpecialities();
    }, [])

    return (
        <section className="bg-slate-100/90 dark:bg-slate-600/95 w-[20.625rem] 2xl:w-[40.625rem] h-[34.375rem] xl:h-[42rem] 2xl:h-[50rem] rounded-md shadow-2xl shadow-slate-500 dark:shadow-slate-700 ml-8 md:ml-20">
            <h3 className="text-center text-2xl font-bold my-10 dark:text-white uppercase">Add Doctor</h3>
            <form className="flex flex-col w-[15rem] 2xl:w-[31.25rem] m-auto xl:gap-10 gap-5 items-center">
                <label htmlFor="name" className="font-bold w-full dark:text-white">Name</label>
                <Input className="bg-slate-200 dark:bg-slate-700 dark:text-white" type="text" name="name" value={doctor?.name} onChange={handleChange} />
                <label htmlFor="departmentId" className="font-bold w-full dark:text-white">Department</label>
                <select name="departmentId" value={doctor?.departmentId} onChange={handleChange} className="bg-slate-200 dark:bg-slate-700 dark:text-white p-2 rounded-md text-black w-full">
                    {departments.map((department) => (
                        <option key={department.id} value={department.id}>
                            {department.name}
                        </option>
                    ))}
                </select>

                <label htmlFor="specialtieId" className="font-bold w-full dark:text-white">Speciality</label>
                <select name="specialtieId" value={doctor?.specialtieId} onChange={handleChange} className="bg-slate-200 dark:bg-slate-700 dark:text-white p-2 rounded-md text-black w-full">
                    {specialities.map((speciality) => (
                        <option key={speciality.id} value={speciality.id}>
                            {speciality.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleCreate} className="bg-green-500 dark:bg-green-400 px-4 py-2 mt-5 rounded-md font-black hover:bg-green-400 transition-all" type="submit"> SUBMIT </button>
            </form>
        </section>
    )
}