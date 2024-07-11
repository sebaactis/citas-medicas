import { db } from "@/lib/db";

export async function GET() {
    const departments = await db.department.findMany();

    if (departments.length <= 0) {
        return new Response("No departments found", {
            status: 404,
            statusText: "No departments found"
        })
    }

    return new Response(JSON.stringify(departments), {
        status: 200,
        statusText: "OK"
    })
}