import { db } from "@/lib/db";
import type { Patient } from "@prisma/client";
import type { APIContext } from "astro";

export async function GET({ request }: APIContext) {

    let patients: Patient[] = [];
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "1");
    const limit = Number(url.searchParams.get("limit") || "1");
    const pagination = url.searchParams.get("pagination") === "true";
    const skip = (page - 1) * limit;

    if (pagination) {
        patients = await db.patient.findMany({
            skip,
            take: limit
        });
    } else {
        patients = await db.patient.findMany({
        });
    }


    const totalPatients = await db.patient.count();

    if (patients.length <= 0) {
        return new Response("No patients found", {
            status: 404
        })
    }

    return new Response(JSON.stringify({ patients, totalPages: Math.ceil(totalPatients / limit) }), {
        status: 200,
    });
}