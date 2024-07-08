import { db } from "@/lib/db";
import type { APIContext } from "astro";

export async function GET({ params }: APIContext) {
    const { id } = params;

    try {

        const medicine = await db.medicine.findUnique({
            where: {
                id: id
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