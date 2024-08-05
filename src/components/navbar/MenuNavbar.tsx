import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Item } from "@/lib/types";
import { CloseNavbar, OpenNavbar } from "../Icons";
import { useState } from "react";

export default function MenuNavbar() {

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const handleMenu = () => {
        if (isNavbarOpen) {
            setIsNavbarOpen(false);
        } else {
            setIsNavbarOpen(true);
        }
    }

    const items: Item[] = [
        {
            icon: "HouseIcon",
            title: "Dashboard",
            link: "/",
        },
        {
            icon: "CalendarIcon",
            title: "Appointments",
            link: "/appointments",
        },
        {
            icon: "PatientsIcon",
            title: "Patients",
            link: "/patients",
        },
        {
            icon: "DoctorIcon",
            title: "Doctors",
            link: "/doctors",
        },
        {
            icon: "DepartmentsIcon",
            title: "Departments",
            link: "/departments",
        },
        {
            icon: "StarIcon",
            title: "Specialities",
            link: "/specialities",
        },
        {
            icon: "MedicineIcon",
            title: "Medicine",
            link: "/medicine",
        },
    ];

    return (
        <div className="block md:hidden">
            <DropdownMenu open={isNavbarOpen} onOpenChange={setIsNavbarOpen}>
                <DropdownMenuTrigger onPointerDown={() => handleMenu()} className="bg-slate-500/90 hover:bg-slate-600 dark:hover:bg-slate-400 transition p-2 rounded-full text-white font-bold ">
                    {isNavbarOpen ? <CloseNavbar /> : <OpenNavbar />}
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    {
                        items.map((item) => {
                            return (
                                <DropdownMenuItem key={item.link}>
                                    <a
                                        href={item.link}
                                        className="text-slate-600 dark:text-slate-100 text-md font-semibold px-4 py-3 transition-all rounded-full"
                                    >
                                        <li className="flex gap-2 items-center">
                                            {item.title}
                                        </li>
                                    </a>
                                </DropdownMenuItem>
                            );
                        })
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}