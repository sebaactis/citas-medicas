import { db } from "@/lib/db";

export async function GET() {
    const appointments = await db.appointment.count();

    return new Response(JSON.stringify(appointments), { status: 200 });
}