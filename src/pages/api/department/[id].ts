import { db } from "@/lib/db";
import type { APIContext } from "astro";

export async function GET({ params }: APIContext) {

    try {

        const department = await db.department.findUnique({
            where: {
                id: params.id
            }
        })

        if (!department) {
            return new Response(
                JSON.stringify({
                    message: "Department not found"
                }),
                {
                    status: 404,
                    statusText: "Not Found"
                }
            )
        }

        return new Response(JSON.stringify(department), { status: 200, statusText: "OK" })
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
        const department = await db.department.findFirst({
            where: {
                id: params.id
            }
        })

        if (!department) {
            return new Response(
                JSON.stringify({
                    message: "Producto no encontrado"
                }),
                {
                    status: 404,
                    statusText: "Not Found"
                }
            )
        }

        await db.department.update({
            where: {
                id: department.id
            },
            data: {
                name: data.name
            }
        })

        return new Response(JSON.stringify({
            message: `The deparment ${params.id} has been updated successfully`
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

        const department = await db.department.findFirst({
            where: {
                id: params.id
            }
        })

        if (!department) {
            return new Response(
                JSON.stringify({
                    message: "Department not found"
                }),
                {
                    status: 404,
                    statusText: "Not Found"
                }
            )
        }

        await db.department.delete({
            where: {
                id: department.id
            }
        })

        return new Response(JSON.stringify({
            message: `The department ${params.id} has been deleted successfully`
        }), { status: 200, statusText: "OK" })

    } catch (err) {

    }
}

export async function getStaticPaths() {
    const department = await db.department.findMany({
        select: {
            id: true
        }
    })

    return department.map((department) => ({
        params: {
            id: department.id
        }
    }))
}