import { db } from "@/lib/db"
import type { Medicine } from "@prisma/client";
import type { APIContext } from "astro";

export async function GET({ request }: APIContext) {
  try {

    let medicines : Medicine[] = [];
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "1");
    const limit = Number(url.searchParams.get("limit") || "6");
    const pagination = url.searchParams.get("pagination") === "true";
    const skip = (page - 1) * limit;

    if (pagination) {
      medicines = await db.medicine.findMany({
        skip,
        take: limit
      });
    } else {
      medicines = await db.medicine.findMany();
    }

    const totalMedicines = await db.medicine.count();


    if (medicines.length <= 0) {
      return new Response(JSON.stringify({
        message: "No existen productos actualmente"
      }),
        {
          status: 404,
          statusText: "Not Found"
        })
    }

    return new Response(JSON.stringify({ medicines, totalPages: Math.ceil(totalMedicines / limit) }), {
      status: 200,
  });
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