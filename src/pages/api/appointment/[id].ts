import { db } from "@/lib/db"
import type { APIContext } from "astro"

export async function GET({ params }: APIContext) {
    const appointment = await db.appointment.findFirst({
        where: {
            id: params.id
        },
        include: {
            patient: true,
            Doctor: true
        }
    })

    if (!appointment) {
        return new Response(
            JSON.stringify({
                message: "Appointment not found"
            }),
            {
                status: 404,
                statusText: "Not Found"
            }
        )
    }

    return new Response(JSON.stringify(appointment), {
        status: 200
    })

}

export async function PUT({ params, request }: APIContext) {

    const data = await request.json();

    console.log(data);

    try {
        const appointment = await db.appointment.findFirst({
            where: {
                id: params.id
            }
        })

        if (!appointment) {
            return new Response(
                JSON.stringify({
                    message: "Appointment not found"
                }),
                {
                    status: 404,
                    statusText: "Not Found"
                }
            )
        }


        const prueba = await db.appointment.update({
            where: {
                id: appointment.id
            },
            data: {
                date: data.date,
                patientId: data.patientId,
                doctorId: data.doctorId
            }
        })

        return new Response(JSON.stringify({
            message: `The appointment ${params.id} has been updated successfully`
        }), { status: 200, statusText: "OK" })
    }
    catch (err) {

        if (err instanceof Error) {
            return new Response(JSON.stringify({
                message: err.message
            }),
                {
                    status: 500,
                    statusText: "Not Found"
                })
        }
    }
}

export async function DELETE({ params }: APIContext) {

    try {

        const appointment = await db.appointment.findFirst({
            where: {
                id: params.id
            }
        })

        if (!appointment) {
            return new Response(
                JSON.stringify({
                    message: "Appointment not found"
                }),
                {
                    status: 404,
                    statusText: "Not Found"
                }
            )
        }

        await db.appointment.delete({
            where: {
                id: appointment.id
            }
        })

        return new Response(JSON.stringify({
            message: `The appointment ${params.id} has been deleted successfully`
        }), { status: 200, statusText: "OK" })

    } catch (err) {

    }
}


export async function getStaticPaths() {
    const appointment = await db.appointment.findMany({
        select: {
            id: true
        }
    })

    return appointment.map((appointment) => ({
        params: {
            id: appointment.id
        }
    }))
}