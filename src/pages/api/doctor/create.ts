import { db } from "@/lib/db";
import type { APIContext } from "astro";

export async function POST({ request }: APIContext) {

    try {

        const doctor = await request.json();
        console.log(doctor);

        if (doctor.name === null || doctor.name === undefined) {
            return new Response("The name of the doctor cannot be blank", {
                status: 400,
                statusText: "The name of the doctor cannot be blank"
            })
        }

        if (doctor.departmentId === null || doctor.departmentId === undefined) {
            return new Response("The department of the doctor cannot be blank", {
                status: 400,
                statusText: "The department of the doctor cannot be blank"
            })
        }

        if (doctor.specialtieId === null || doctor.specialtieId === undefined) {
            return new Response("The speciality of the doctor cannot be blank", {
                status: 400,
                statusText: "The speciality of the doctor cannot be blank"
            })
        }

        const department = await db.department.findFirst({

        })

        const create = await db.doctor.create({
            data: {
                name: doctor.name,
                departmentId: doctor.departmentId,
                specialtieId: doctor.specialtieId
            }
        })

        if (create === null) {
            return new Response("Error at the create the doctor", {
                status: 400,
                statusText: "Error at the create the doctor"
            })
        }

        return new Response("The new doctor is created successfully", {
            status: 201,
            statusText: "Created"
        })
    } catch (err) {
        return new Response("Error to create the doctor", {
            status: 500,
            statusText: "Error to create the doctor"
        })
    }

}