import { db } from "@/lib/db";
import type { Doctor } from "@prisma/client";
import type { APIContext } from "astro";

export async function GET({request}: APIContext) {


    let doctors: Doctor[] = [];
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "1");
    const limit = Number(url.searchParams.get("limit") || "1");
    const pagination = url.searchParams.get("pagination") === "true";
    const skip = (page - 1) * limit;

    if(pagination) {
        doctors = await db.doctor.findMany({
            skip,
            take: limit,
            include: {
                department: true,
                specialtie: true
            }
        });
    } else {
        doctors = await db.doctor.findMany({
            include: {
                department: true,
                specialtie: true
            }
        });
    }

    const totalDoctors = await db.doctor.count();

    if(doctors.length <= 0) {
        return new Response("No doctors found", {
            status: 404
        })
    }

    return new Response(JSON.stringify({ doctors, totalPages: Math.ceil(totalDoctors / limit) }), {
        status: 200,
    });
}