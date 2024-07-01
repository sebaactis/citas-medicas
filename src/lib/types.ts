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
} from "@/components/Icons";

export const SideBarIcons = {
    "CalendarIcon": CalendarIcon,
    "DepartmentsIcon": DepartmentsIcon,
    "DoctorIcon": DoctorIcon,
    "EarningIcon": EarningIcon,
    "HelpIcon": HelpIcon,
    "HouseIcon": HouseIcon,
    "MedicineIcon": MedicineIcon,
    "PatientsIcon": PatientsIcon,
    "SettingIcon": SettingIcon
}

export interface Item {
    icon: keyof typeof SideBarIcons;
    title: string;
    link: string;
}
