import { db } from "@/lib/db";
import type { APIContext } from "astro";

export async function GET({ params }: APIContext) {

    try {

        const speciality = await db.specialtie.findUnique({
            where: {
                id: params.id
            }
        })

        if (!speciality) {
            return new Response(
                JSON.stringify({
                    message: "Speciality not found"
                }),
                {
                    status: 404,
                    statusText: "Not Found"
                }
            )
        }

        return new Response(JSON.stringify(speciality), { status: 200, statusText: "OK" })
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

export async function PUT({ params, request }: APIContext) {

    const data = await request.json();

    try {
        const speciality = await db.specialtie.findFirst({
            where: {
                id: params.id
            }
        })

        if (!speciality) {
            return new Response(
                JSON.stringify({
                    message: "Speciality not found"
                }),
                {
                    status: 404,
                    statusText: "Not Found"
                }
            )
        }

        await db.specialtie.update({
            where: {
                id: speciality.id
            },
            data: {
                name: data.name
            }
        })

        return new Response(JSON.stringify({
            message: `The speciality ${params.id} has been updated successfully`
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

        const speciality = await db.specialtie.findFirst({
            where: {
                id: params.id
            }
        })

        if (!speciality) {
            return new Response(
                JSON.stringify({
                    message: "Speciality not found"
                }),
                {
                    status: 404,
                    statusText: "Not Found"
                }
            )
        }

        await db.specialtie.delete({
            where: {
                id: speciality.id
            }
        })

        return new Response(JSON.stringify({
            message: `The speciality ${params.id} has been deleted successfully`
        }), { status: 200, statusText: "OK" })

    } catch (err) {

    }
}

export async function getStaticPaths() {
    const specialities = await db.specialtie.findMany({
        select: {
            id: true
        }
    })

    return specialities.map((specialtie) => ({
        params: {
            id: specialtie.id
        }
    }))
}