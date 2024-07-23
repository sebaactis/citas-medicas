import { db } from "@/lib/db";

export async function GET() {
    const medicines = await db.medicine.count();

    return new Response(JSON.stringify(medicines), { status: 200 });
}