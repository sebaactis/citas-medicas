import { db } from "@/lib/db"
import type { APIContext } from "astro"

export async function GET({ params }: APIContext) {
    const doctor = await db.doctor.findFirst({
        where: {
            id: params.id
        },
        include: {
            department: true,
            specialtie: true
        }
    })

    if (!doctor) {
        return new Response(
            JSON.stringify({
                message: "Doctor not found"
            }),
            {
                status: 404,
                statusText: "Not Found"
            }
        )
    }

    return new Response(JSON.stringify(doctor), {
        status: 200
    })

}

export async function PUT({ params, request }: APIContext) {

    const data = await request.json();

    try {
        const doctor = await db.doctor.findFirst({
            where: {
                id: params.id
            }
        })

        if (!doctor) {
            return new Response(
                JSON.stringify({
                    message: "Doctor not found"
                }),
                {
                    status: 404,
                    statusText: "Not Found"
                }
            )
        }

        await db.doctor.update({
            where: {
                id: doctor.id
            },
            data: {
                name: data.name,
                departmentId: data.departmentId,
                specialtieId: data.specialtieId
            }
        })

        return new Response(JSON.stringify({
            message: `The doctor ${params.id} has been updated successfully`
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

        const doctor = await db.doctor.findFirst({
            where: {
                id: params.id
            }
        })

        if (!doctor) {
            return new Response(
                JSON.stringify({
                    message: "Doctor not found"
                }),
                {
                    status: 404,
                    statusText: "Not Found"
                }
            )
        }

        await db.doctor.delete({
            where: {
                id: doctor.id
            }
        })

        return new Response(JSON.stringify({
            message: `The doctor ${params.id} has been deleted successfully`
        }), { status: 200, statusText: "OK" })

    } catch (err) {

    }
}


export async function getStaticPaths() {
    const doctor = await db.doctor.findMany({
        select: {
            id: true
        }
    })

    return doctor.map((doctor) => ({
        params: {
            id: doctor.id
        }
    }))
}