import { db } from "@/lib/db";
import type { APIContext } from "astro";

export async function POST({ request }: APIContext) {

    const speciality = await request.json();

    const specialityExist = await db.specialtie.findFirst({
        where: {
            name: speciality.name
        }
    })

    if (specialityExist) {
        return new Response("The speciality already exists", {
            status: 400,
            statusText: "The speciality already exists"
        })
    }
    if (speciality.name === "") {
        return new Response("The speciality cannot be empty", {
            status: 400,
            statusText: "The speciality cannot be empty"
        })
    }

    const create = await db.specialtie.create({
        data: {
            name: speciality.name
        }
    })

    if (create === null) {
        return new Response("The speciality creation failed, please try again", {
            status: 500,
            statusText: "The speciality creation failed"
        })
    }

    return new Response("The speciality created successfully", {
        status: 201,
        statusText: "The speciality created successfully"
    })

}