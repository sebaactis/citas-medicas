import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export default function AddDoctor() {

    const temporalDeparments = ["Cardiology", "Children", "Diabetic"]
    const temporalSpecialitys = ["Cardology", "Children"]

    return (
        <section className="bg-slate-100/90 dark:bg-slate-600/95 ml-20 w-[650px] h-[800px] rounded-md shadow-2xl shadow-slate-500 dark:shadow-slate-700">
            <h3 className="text-center text-2xl font-bold my-10 dark:text-white uppercase">Add Doctor</h3>
            <form className="flex flex-col w-[500px] m-auto gap-10 items-center">
                <Input type="text" placeholder="Name" />
                <Select >
                    <SelectTrigger className=" dark:text-white dark:bg-slate-700 dark:border-slate-500">
                        <SelectValue placeholder="Deparment" />
                    </SelectTrigger>
                    <SelectContent className="dark:text-white dark:bg-slate-700 dark:border-slate-500">
                        {
                            temporalDeparments.map((depar) => {
                                return (
                                    <SelectItem key={depar} value={depar}>{depar}</SelectItem>
                                )
                            })
                        }
                    </SelectContent>
                </Select>
                <Select >
                    <SelectTrigger className=" dark:text-white dark:bg-slate-700 dark:border-slate-500">
                        <SelectValue placeholder="Speciality" />
                    </SelectTrigger>
                    <SelectContent className="dark:text-white dark:bg-slate-700 dark:border-slate-500">
                        {
                            temporalSpecialitys.map((speciality) => {
                                return (
                                    <SelectItem key={speciality} value={speciality}>{speciality}</SelectItem>
                                )
                            })
                        }
                    </SelectContent>
                </Select>
                <button className="bg-green-500 dark:bg-green-400 px-4 py-2 rounded-md font-black hover:bg-green-400 transition-all" type="submit"> SUBMIT </button>
            </form>
        </section>
    )
}