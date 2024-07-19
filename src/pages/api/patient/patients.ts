import { db } from "@/lib/db";

export async function GET() {
    const patients = await db.patient.findMany({});

    if(patients.length <= 0) {
        return new Response("No patients found", {
            status: 404
        })
    }

    return new Response(JSON.stringify(patients), {
        status: 200
    })
}