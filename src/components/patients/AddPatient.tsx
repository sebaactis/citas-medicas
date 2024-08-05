import { Input } from "@/components/ui/input"
import { useState } from "react";
import { toast } from "sonner";

type PatientCreate = {
    name: string,
    age: number,
    email: string
}

export default function AddPatient() {

    const [patient, setPatient] = useState<PatientCreate | null>({ name: "", age: 0, email: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPatient(prevState => prevState ? { ...prevState, [name]: value } : null);
    }

    const handleCreate = async (e: any) => {

        e.preventDefault();

        try {
            const response = await fetch("https://citasmedicasdash.netlify.app/api/patient/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(patient)
            })

            if (response.status === 201) {
                toast.success("Patient created successfully!", {
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

            toast.error("Error at create the patient, please verify!", {
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

    return (
        <section className="bg-slate-100/90 dark:bg-slate-600/95 w-[20.625rem] 2xl:w-[40.625rem] h-[34.375rem] 2xl:h-[50rem] rounded-md shadow-2xl shadow-slate-500 dark:shadow-slate-700 ml-5 md:ml-20">
            <h3 className="text-center text-2xl font-bold my-10 dark:text-white uppercase">Add patient</h3>
            <form className="flex flex-col w-[15rem] 2xl:w-[31.25rem] m-auto gap-10 items-center">
                <Input className="dark:text-slate-400" type="text" placeholder="Name" name="name" value={patient?.name} onChange={handleChange}/>
                <Input className="dark:text-slate-400" type="number" placeholder="Age" name="age" value={patient?.age} onChange={handleChange}/>
                <Input className="dark:text-slate-400" type="email" placeholder="Email" name="email" value={patient?.email} onChange={handleChange}/>
                <button onClick={handleCreate} className="bg-green-500 dark:bg-green-400 px-4 py-2 rounded-md font-black hover:bg-green-400 transition-all" type="submit"> SUBMIT </button>
            </form>
        </section>
    )
}