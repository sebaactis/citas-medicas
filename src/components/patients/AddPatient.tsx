import { Input } from "@/components/ui/input"

export default function AddPatient() {
    return (
        <section className="bg-slate-100/90 dark:bg-slate-600/95 w-[20.625rem] 2xl:w-[40.625rem] h-[34.375rem] 2xl:h-[50rem] rounded-md shadow-2xl shadow-slate-500 dark:shadow-slate-700 ml-5 md:ml-20">
            <h3 className="text-center text-2xl font-bold my-10 dark:text-white uppercase">Add patient</h3>
            <form className="flex flex-col w-[15rem] 2xl:w-[31.25rem] m-auto gap-10 items-center">
                <Input type="text" placeholder="Name" />
                <Input type="number" placeholder="Age" />
                <Input type="email" placeholder="Email" />
                <button className="bg-green-500 dark:bg-green-400 px-4 py-2 rounded-md font-black hover:bg-green-400 transition-all" type="submit"> SUBMIT </button>
            </form>
        </section>
    )
}