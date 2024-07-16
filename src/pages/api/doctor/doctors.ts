import { db } from "@/lib/db";

export async function GET() {
    const doctors = await db.doctor.findMany({
        include: {
            department: true,
            specialtie: true
        }
    });

    if(doctors.length <= 0) {
        return new Response("No doctors found", {
            status: 404
        })
    }

    return new Response(JSON.stringify(doctors), {
        status: 200
    })
}