import { db } from "@/lib/db"

export async function GET() {
  try {

    const medicines = await db.medicine.findMany();

    if (medicines.length <= 0) {
      return new Response(JSON.stringify({
        message: "No existen productos actualmente"
      }),
        {
          status: 404,
          statusText: "Not Found"
        })
    }

    return new Response(JSON.stringify(medicines), {
      status: 200,
      statusText: "OK"

    })
  } catch (err) {

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