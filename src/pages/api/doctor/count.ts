import { db } from "@/lib/db";

export async function GET() {
    const doctors = await db.doctor.count();

    return new Response(JSON.stringify(doctors), { status: 200 });
}