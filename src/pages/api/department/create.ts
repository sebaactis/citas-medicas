import { db } from "@/lib/db";
import type { APIContext } from "astro";

export async function POST({ request }: APIContext) {

    const department = await request.json();

    const departmentExist = await db.department.findFirst({
        where: {
            name: department.name
        }
    })

    if (departmentExist) {
        return new Response("The department already exists", {
            status: 400,
            statusText: "The department already exists"
        })
    }
    if(department.name === "") {
        return new Response("The department cannot be empty", {
            status: 400,
            statusText: "The department cannot be empty"
        })
    }

    const create = await db.department.create({
        data: {
            name: department.name
        }
    })

    if(create === null) {
        return new Response("The department creation failed, please try again", {
            status: 500,
            statusText: "The department creation failed"
        })
    }

    return new Response("The department created successfully", {
        status: 201,
        statusText: "The department created successfully"
    })

}