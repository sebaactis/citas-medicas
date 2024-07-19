import { db } from "@/lib/db";
import type { APIContext } from "astro";

export async function POST({ request }: APIContext) {

    try {

        const patient = await request.json();

        if (patient.name === null || patient.name === undefined || patient.name === "") {
            return new Response("The name of the patient cannot be blank", {
                status: 400,
                statusText: "The name of the patient cannot be blank"
            })
        }

        if (patient.age === null || patient.age  === undefined || patient.age <= 0) {
            return new Response("The age of the patient cannot be blank", {
                status: 400,
                statusText: "The age of the patient cannot be blank"
            })
        }

        if (patient.email === null || patient.email === undefined || patient.email === "") {
            return new Response("The email of the patient cannot be blank", {
                status: 400,
                statusText: "The email of the patient cannot be blank"
            })
        }

        const create = await db.patient.create({
            data: {
                name: patient.name,
                age: parseInt(patient.age),
                email: patient.email 
            }
        })

        if (create === null) {
            return new Response("Error at the create the patient", {
                status: 400,
                statusText: "Error at the create the patient"
            })
        }

        return new Response("The new patient is created successfully", {
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