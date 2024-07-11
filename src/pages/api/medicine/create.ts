import { db } from "@/lib/db";
import type { APIContext } from "astro";

export async function POST({ request }: APIContext) {

    const medicine = await request.json();

    if ((medicine.name === null || medicine.name === undefined) || (medicine.price === null || medicine.name === undefined)) {
        return new Response("The name or the price cannot be blank", {
            status: 400,
            statusText: "The name or the price cannot be blank"
        })
    }

    if (medicine.price <= 0) {
        return new Response("The price cannot be 0 or negative", {
            status: 400,
            statusText: "The price cannot be 0 or negative"
        })
    }

    const createMedicine = await db.medicine.create({
        data: {
            name: medicine.name,
            price: medicine.price,
            rated: 0
        }
    })

    if (createMedicine === null) {
        return new Response("Error at the create the medicine", {
            status: 400,
            statusText: "Error at the create the medicine"
        })
    }

    return new Response("The new medicine is created successfully", {
        status: 201,
        statusText: "Created"
    })

}