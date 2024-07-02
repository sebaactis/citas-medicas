import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatDate } from "date-fns";

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 8; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      options.push(<SelectItem key={time} value={time}>{time}</SelectItem>);
    }
  }
  return options;
};

const temporalDoctors = ["Pedro Rodriguez", "Adriana Fernandez", "Santiago Messi"]


export function AddAppointment() {

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [hour, setHour] = useState<any>();
  const [doctor, setDoctor] = useState<any>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedDate = date ? formatDate(date, "dd/MM/yyyy") : "";

    const submit = {
      formattedDate,
      hour,
      doctor
    }

    console.log(submit);
  }

  return (
    <section className="bg-slate-100/90 dark:bg-slate-600/95 w-[650px] h-[800px] rounded-md shadow-2xl shadow-slate-500 dark:shadow-slate-700">
      <h3 className="text-center text-2xl font-bold my-10 dark:text-white">Add appointment</h3>
      <form className="flex flex-col gap-10 items-center" onSubmit={handleSubmit}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border-2 border-slate-300 dark:border-slate-500 p-7"
        />
        <div className="flex gap-1">
          <Select onValueChange={(value) => setHour(value)}>
            <SelectTrigger className="w-[180px] dark:text-white dark:bg-slate-700 dark:border-slate-500">
              <SelectValue placeholder="Hour" />
            </SelectTrigger>
            <SelectContent className="dark:text-white dark:bg-slate-700 dark:border-slate-500">
              {generateTimeOptions()}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setDoctor(value)}>
            <SelectTrigger className="w-[180px] dark:text-white dark:bg-slate-700 dark:border-slate-500">
              <SelectValue placeholder="Doctor" />
            </SelectTrigger>
            <SelectContent className="dark:text-white dark:bg-slate-700 dark:border-slate-500">
              {temporalDoctors.map((doctor) => {
                return (
                  <SelectItem key={doctor} value={doctor}>{doctor}</SelectItem>
                )
              })}

            </SelectContent>
          </Select>
        </div>
        <button className="bg-green-500 dark:bg-green-400 px-4 py-2 rounded-md font-black hover:bg-green-400 transition-all" type="submit"> SUBMIT </button>
      </form>

    </section>
  )
}