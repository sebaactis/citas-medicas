import { Input } from "@/components/ui/input"

export default function AddPatient() {
    return (
        <section className="bg-slate-100/90 dark:bg-slate-600/95 ml-20 w-[650px] h-[800px] rounded-md shadow-2xl shadow-slate-500 dark:shadow-slate-700">
            <h3 className="text-center text-2xl font-bold my-10 dark:text-white">Add patient</h3>
            <form className="flex flex-col w-[500px] m-auto gap-10 items-center">
                <Input type="text" placeholder="Name" />
                <Input type="number" placeholder="Age" />
                <Input type="email" placeholder="Email" />
                <button className="bg-green-500 dark:bg-green-400 px-4 py-2 rounded-md font-black hover:bg-green-400 transition-all" type="submit"> SUBMIT </button>
            </form>
        </section>
    )
}