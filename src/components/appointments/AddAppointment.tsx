import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export function AddAppointment() {

  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <section className="bg-slate-200 w-[650px] h-[800px] rounded-md">
      <h3 className="text-center text-2xl font-bold my-10">Agregar una cita</h3>
      <article className="flex flex-col gap-10 items-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border-2 border-slate-300 p-7"
        />
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Hour" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Doctor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <button className="bg-green-300 px-3 py-2 rounded-md font-black hover:bg-green-400 transition-all" type="submit"> Confirm </button>
      </article>

    </section>
  )
}