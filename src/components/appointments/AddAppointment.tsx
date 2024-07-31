import { useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { type AppointmentIn, type DoctorWithRelations } from "@/lib/types";
import type { Patient } from "@prisma/client";
import { toast } from "sonner";

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 8; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      options.push(<option key={time} value={time}>{time}</option>);
    }
  }
  return options;
};


export function AddAppointment() {

  const [appointment, setAppointment] = useState<AppointmentIn>({
    id: "",
    date: new Date(),
    hour: '',
    patientId: '3f4c7adb-e4ef-4801-9b19-f391a1bbbdb6',
    doctorId: '7b0bd05c-939f-4c22-b1c0-1610a80ffcf3'
  });
  
  const [doctors, setDoctors] = useState<DoctorWithRelations[]>();
  const [patients, setPatients] = useState<Patient[]>();

  const getDoctors = async (pagination = false) => {
    try {
      const response = await fetch(`http://localhost:4321/api/doctor/doctors?pagination=${pagination}`);
      const data = await response.json();
      setDoctors(data.doctors);
    } catch (err) {
      console.error(err)
    }
  };

  const getPatients = async (pagination = false) => {
    try {
      const response = await fetch(`http://localhost:4321/api/patient/patients?pagination=${pagination}`)
      const data = await response.json();
      setPatients(data.patients);
    } catch (err) {
      console.error(err)
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setAppointment((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleDateChange = (date: any) => {
    setAppointment((prevState) => ({
      ...prevState,
      date
    }))
  }


  useEffect(() => {
    getDoctors();
    getPatients();
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    try {
      const response = await fetch("http://localhost:4321/api/appointment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(appointment)
      })

      if (response.status === 201) {
        toast.success("Appointment created successfully!", {
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

  return (
    <section className="bg-slate-100/90 dark:bg-slate-600/95 w-[20.625rem] ml-10 md:ml-0 2xl:w-[40.625rem] h-[34.375rem] xl:h-[47rem] 2xl:h-[50rem] rounded-md shadow-2xl shadow-slate-500 dark:shadow-slate-700">
      <h3 className="text-center text-2xl font-bold my-10 dark:text-white uppercase">Add appointment</h3>
      <form className="flex flex-col gap-2 xl:gap-10 items-center" onSubmit={handleSubmit}>
        <Calendar
          mode="single"
          selected={appointment.date}
          onSelect={handleDateChange}
          className="rounded-md border-2 border-slate-300 dark:border-slate-500 p-[-15px] 2xl:p-7"
        />
        <div className="flex flex-col gap-3">
          <select className="2xl:w-[11.25rem] dark:text-white dark:bg-slate-700 dark:border-slate-500 p-2 rounded-md" name="hour" value={appointment.hour} onChange={handleChange}>
            {generateTimeOptions()}
          </select>

          <select className="2xl:w-[11.25rem] dark:text-white dark:bg-slate-700 dark:border-slate-500 p-2 rounded-md" name="patientId" value={appointment.patientId} onChange={handleChange}>
            {patients !== undefined && patients.map((patient) => {
              return (
                <option key={patient.id} value={patient.id}>{patient.name}</option>
              )
            })}
          </select>

          <select className="2xl:w-[11.25rem] dark:text-white dark:bg-slate-700 dark:border-slate-500 p-2 rounded-md" name="doctorId" value={appointment.doctorId} onChange={handleChange}>
            {doctors !== undefined && doctors.map((doctor) => {
              return (
                <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
              )
            })}
          </select>

        </div>
        <button className="bg-green-500 dark:bg-green-400 px-4 py-2 rounded-md font-black hover:bg-green-400 transition-all" type="submit"> SUBMIT </button>
      </form>

    </section>
  )
}