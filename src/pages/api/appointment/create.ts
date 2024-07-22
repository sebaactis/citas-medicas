import { db } from "@/lib/db";
import type { APIContext } from "astro";

export async function POST({ request }: APIContext) {

    try {

        const appointment = await request.json();

        if (appointment.date === null || appointment.date === undefined) {
            return new Response("The date of the appointment cannot be blank", {
                status: 400,
                statusText: "The date of the appointment cannot be blank"
            })
        }

        if (appointment.patientId === null || appointment.patientId === undefined) {
            return new Response("The patientId of the appointment cannot be blank", {
                status: 400,
                statusText: "The patientId of the appointment cannot be blank"
            })
        }

        if (appointment.doctorId === null || appointment.doctorId === undefined) {
            return new Response("The doctorId of the appointment cannot be blank", {
                status: 400,
                statusText: "The doctorId of the appointment cannot be blank"
            })
        }

        const create = await db.appointment.create({
            data: {
                date: appointment.date,
                patientId: appointment.patientId,
                doctorId: appointment.doctorId
            }
        })

        if (create === null) {
            return new Response("Error at the create the appointment", {
                status: 400,
                statusText: "Error at the create the appointment"
            })
        }

        return new Response("The new appointment is created successfully", {
            status: 201,
            statusText: "Created"
        })
    } catch (err) {
        return new Response("Error to create the appointment", {
            status: 500,
            statusText: "Error to create the appointment"
        })
    }

}