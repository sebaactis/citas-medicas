import { db } from "@/lib/db";

export async function GET() {
    const specialities = await db.specialtie.findMany();

    if (specialities.length <= 0) {
        return new Response("No specialities found", {
            status: 404,
            statusText: "No specialities found"
        })
    }

    return new Response(JSON.stringify(specialities), {
        status: 200,
        statusText: "OK"
    })
}