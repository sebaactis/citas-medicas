import { db } from "@/lib/db"
import type { APIContext } from "astro"

export async function GET({ params }: APIContext) {
    const patient = await db.patient.findFirst({
        where: {
            id: params.id
        }
    })

    if (!patient) {
        return new Response(
            JSON.stringify({
                message: "Patient not found"
            }),
            {
                status: 404,
                statusText: "Not Found"
            }
        )
    }

    return new Response(JSON.stringify(patient), {
        status: 200
    })

}

export async function PUT({ params, request }: APIContext) {

    const data = await request.json();

    try {
        const patient = await db.patient.findFirst({
            where: {
                id: params.id
            }
        })

        if (!patient) {
            return new Response(
                JSON.stringify({
                    message: "Patient not found"
                }),
                {
                    status: 404,
                    statusText: "Not Found"
                }
            )
        }

        await db.patient.update({
            where: {
                id: patient.id
            },
            data: {
                name: data.name,
                age: parseInt(data.age),
                email: data.email
            }
        })


        return new Response(JSON.stringify({
            message: `The patient ${params.id} has been updated successfully`
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

        const patient = await db.patient.findFirst({
            where: {
                id: params.id
            }
        })

        if (!patient) {
            return new Response(
                JSON.stringify({
                    message: "Patient not found"
                }),
                {
                    status: 404,
                    statusText: "Not Found"
                }
            )
        }

        await db.patient.delete({
            where: {
                id: patient.id
            }
        })

        return new Response(JSON.stringify({
            message: `The patient ${params.id} has been deleted successfully`
        }), { status: 200, statusText: "OK" })

    } catch (err) {

    }
}


export async function getStaticPaths() {
    const patient = await db.patient.findMany({
        select: {
            id: true
        }
    })

    return patient.map((patient) => ({
        params: {
            id: patient.id
        }
    }))
}