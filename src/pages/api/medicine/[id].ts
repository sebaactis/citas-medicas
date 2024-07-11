import { db } from "@/lib/db";
import type { APIContext } from "astro";

export async function GET({ params }: APIContext) {

    try {

        const medicine = await db.medicine.findUnique({
            where: {
                id: params.id
            }
        })

        if (!medicine) {
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

        return new Response(JSON.stringify(medicine), { status: 200, statusText: "OK" })
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
        const medicine = await db.medicine.findFirst({
            where: {
                id: params.id
            }
        })

        if (!medicine) {
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

        await db.medicine.update({
            where: {
                id: medicine.id
            },
            data: {
                name: data.name,
                price: data.price
            }
        })

        return new Response(JSON.stringify({
            message: `El producto ${params.id} fue actualizado correctamente`
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

        const medicine = await db.medicine.findFirst({
            where: {
                id: params.id
            }
        })

        if (!medicine) {
            return new Response(
                JSON.stringify({
                    message: "Producto not found"
                }),
                {
                    status: 404,
                    statusText: "Not Found"
                }
            )
        }

        await db.medicine.delete({
            where: {
                id: medicine.id
            }
        })

        return new Response(JSON.stringify({
            message: `El producto ${params.id} fue eliminado correctamente`
        }), { status: 200, statusText: "OK" })

    } catch (err) {

    }
}

export async function getStaticPaths() {
    const medicines = await db.medicine.findMany({
        select: {
            id: true
        }
    })

    return medicines.map((medicine) => ({
        params: {
            id: medicine.id
        }
    }))
}