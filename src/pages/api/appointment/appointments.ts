import { db } from "@/lib/db";

export async function GET() {
    const appointments = await db.appointment.findMany({
        include: {
            Doctor: true,
            patient: true
        }
    });

    if (appointments.length <= 0) {
        return new Response("No appointments found", {
            status: 404
        })
    }

    return new Response(JSON.stringify(appointments), {
        status: 200
    })
}