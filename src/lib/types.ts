import {
    CalendarIcon,
    DepartmentsIcon,
    DoctorIcon,
    EarningIcon,
    HelpIcon,
    HouseIcon,
    MedicineIcon,
    PatientsIcon,
    SettingIcon,
    StarIcon,
} from "@/components/Icons";
import type { Appointment, Department, Doctor, Patient, Specialtie } from "@prisma/client";

export const SideBarIcons = {
    "CalendarIcon": CalendarIcon,
    "DepartmentsIcon": DepartmentsIcon,
    "DoctorIcon": DoctorIcon,
    "EarningIcon": EarningIcon,
    "HelpIcon": HelpIcon,
    "HouseIcon": HouseIcon,
    "MedicineIcon": MedicineIcon,
    "PatientsIcon": PatientsIcon,
    "SettingIcon": SettingIcon,
    "StarIcon": StarIcon
}

export interface Item {
    icon: keyof typeof SideBarIcons;
    title: string;
    link: string;
}

export type DoctorWithRelations = Doctor & {
    department: Department
    specialtie: Specialtie
}

export type AppointmentWithRelations = Appointment & {
    patient: Patient,
    Doctor: Doctor
}

