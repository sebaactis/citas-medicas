import { db } from "@/lib/db";

export async function GET() {
    const appointmentsByDoctor = await db.appointment.groupBy({
        by: ['doctorId'],
        _count: {
            id: true
        },
        orderBy: {
            _count: {
                id: 'desc'
            }
        },
        take: 5
    })

    const doctorIds = appointmentsByDoctor.map(app => app.doctorId);

    const doctors = await db.doctor.findMany({
        where: {
            id: { in: doctorIds }
        },
        select: {
            id: true,
            name: true
        }
    })

    const doctorMap = doctors.reduce((map, doctor) => {
        map[doctor.id] = doctor.name;
        return map;
    }, {});

    const results = appointmentsByDoctor.map(app => ({
        doctorId: app.doctorId,
        doctorName: doctorMap[app.doctorId] || 'Unknown',
        count: app._count.id
    }));

    return new Response(JSON.stringify(results), { status: 200 })
}