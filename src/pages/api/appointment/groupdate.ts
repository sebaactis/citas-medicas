import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export async function GET() {
    const appointmentsGroup = await db.appointment.groupBy({
        by: ['date'],
        _count: {
            id: true
        },
        orderBy: [
            {
                date: 'asc'
            }
        ]
    })

    const results = appointmentsGroup.map(app => ({
        date: formatDate(app.date.toISOString()),
        count: app._count.id
    }))

    console.log(results)


    return new Response(JSON.stringify(results), { status: 200 })
}