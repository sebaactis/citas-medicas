import { db } from "@/lib/db";

export async function GET() {
    const patients = await db.patient.count();

    return new Response(JSON.stringify(patients), { status: 200 });
}