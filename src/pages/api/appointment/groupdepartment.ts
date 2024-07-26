import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

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

    const doctorIds = appointmentsByDoctor.map(appointment => appointment.doctorId);

    const doctorsWithDepartments = await db.doctor.findMany({
        where: {
          id: {
            in: doctorIds
          }
        },
        include: {
          department: true
        }
      });

      const appointmentCountsByDepartment = doctorsWithDepartments.reduce((acc, doctor) => {
        const departmentId = doctor.department.id;
        const departmentName = doctor.department.name;
      
        const appointmentCount = appointmentsByDoctor.find(appointment => appointment.doctorId === doctor.id)?._count.id || 0;
      
        if (!acc[departmentId]) {
          acc[departmentId] = { departmentName, appointmentCount: 0 };
        }
      
        acc[departmentId].appointmentCount += appointmentCount;
      
        return acc;
      }, {});

      const result = Object.keys(appointmentCountsByDepartment).map(departmentId => ({
        departmentId,
        Name: appointmentCountsByDepartment[departmentId].departmentName,
        Quantity: appointmentCountsByDepartment[departmentId].appointmentCount,
      }));

    return new Response(JSON.stringify(result), { status: 200 })
}