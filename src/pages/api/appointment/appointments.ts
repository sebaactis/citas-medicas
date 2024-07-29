import { db } from "@/lib/db";
import type { APIContext } from "astro";

export async function GET({ request }: APIContext) {

    let appointments;
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "1");
    const limit = Number(url.searchParams.get("limit") || "6");
    const pagination = url.searchParams.get("pagination") === "true";
    const skip = (page - 1) * limit;


    if (pagination) {

        appointments = await db.appointment.findMany({
            skip,
            take: limit,
            include: {
                Doctor: true,
                patient: true
            }
        });
    } else {
        appointments = await db.appointment.findMany({
            include: {
                Doctor: true,
                patient: true
            }
        });
    }



    const totalAppointments = await db.appointment.count();

    if (appointments.length <= 0) {
        return new Response("No appointments found", {
            status: 404
        })
    }

    return new Response(JSON.stringify({ appointments, totalPages: Math.ceil(totalAppointments / limit) }), {
        status: 200,
    });
}