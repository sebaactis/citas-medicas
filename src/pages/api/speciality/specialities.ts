import { db } from "@/lib/db";
import type { Specialtie } from "@prisma/client";
import type { APIContext } from "astro";

export async function GET({request}: APIContext) {

    let specialities: Specialtie[] = [];
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "1");
    const limit = Number(url.searchParams.get("limit") || "1");
    const pagination = url.searchParams.get("pagination") === "true";
    const skip = (page - 1) * limit;

    if (pagination) {
        specialities = await db.specialtie.findMany({
            skip,
            take: limit
        });
    } else {
        specialities = await db.specialtie.findMany();
    }

    const totalSpecialties = await db.specialtie.count();

    if (specialities.length <= 0) {
        return new Response("No specialities found", {
            status: 404,
            statusText: "No specialities found"
        })
    }

    return new Response(JSON.stringify({specialities, totalPages: Math.ceil(totalSpecialties / limit)}), {
        status: 200,
        statusText: "OK"
    })
}