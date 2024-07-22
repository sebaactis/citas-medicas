import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner";

export default function AddSpeciality() {

    const [speciality, setSpeciality] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpeciality(e.target.value);
    }

    const handleSubmit = async (e: any) => {

        e.preventDefault();

        try {
            const payload = {
                name: speciality
            }

            const response = await fetch("http://localhost:4321/api/speciality/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })

            if (response.status === 201) {

                toast.success("Speciality created successfully!", {
                    classNames: {
                        toast: 'bg-green-700 border-green-700',
                        title: 'text-white',
                        icon: 'text-white'
                    }
                })
                setSpeciality("")
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
                return;
            }

            toast.error("Error at create the department, please verify!", {
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
        <section className="bg-slate-100/90 dark:bg-slate-600/95 w-[20.625rem] 2xl:w-[40.625rem] h-[34.375rem] 2xl:h-[50rem] rounded-md shadow-2xl shadow-slate-500 dark:shadow-slate-700 ml-8 md:ml-20">
            <h3 className="text-center text-2xl font-bold my-10 dark:text-white uppercase">Add Speciality</h3>
            <form className="flex flex-col w-[15rem] 2xl:w-[31.25rem] m-auto gap-10 items-center">
                <Input className="dark:bg-slate-700 dark:border-slate-800 dark:text-white" type="text" placeholder="Name" onChange={(e) => handleChange(e)} />
                <button onClick={handleSubmit} className="bg-green-500 dark:bg-green-400 px-4 py-2 rounded-md font-black hover:bg-green-400 transition-all" type="submit"> SUBMIT </button>
            </form>
        </section>
    )
}