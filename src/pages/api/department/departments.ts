import { db } from "@/lib/db";
import type { Department } from "@prisma/client";
import type { APIContext } from "astro";

export async function GET({ request }: APIContext) {

    let departments: Department[] = [];
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "1");
    const limit = Number(url.searchParams.get("limit") || "1");
    const pagination = url.searchParams.get("pagination") === "true";
    const skip = (page - 1) * limit;

    if (pagination) {
        departments = await db.department.findMany({
            skip,
            take: limit
        });
    } else {
        departments = await db.department.findMany();
    }

    const totalDepartments = await db.department.count();

    if (departments.length <= 0) {
        return new Response("No departments found", {
            status: 404,
            statusText: "No departments found"
        })
    }

    return new Response(JSON.stringify({departments, totalPages: Math.ceil(totalDepartments / limit)}), {
        status: 200,
        statusText: "OK"
    })
}