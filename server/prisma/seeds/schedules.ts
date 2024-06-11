import { AvailabilityType } from "@prisma/client";

export const schedules = [
    {//1
      branchId: 1,
      availability: AvailabilityType.SCHEDULE,
      startDate: new Date("2024-06-01T08:00:00Z"),
      endDate: new Date("2024-06-01T17:00:00Z"),
      description: "Regular working hours"
    },
    {//2
      branchId: 2,
      availability: AvailabilityType.SCHEDULE,
      startDate: new Date("2024-06-02T08:00:00Z"),
      endDate: new Date("2024-06-02T17:00:00Z"),
      description: "Regular working hours"
    },
    {//3
      branchId: 3,
      availability: AvailabilityType.BLOCK,
      startDate: new Date("2024-06-03T08:00:00Z"),
      endDate: new Date("2024-06-03T17:00:00Z"),
      description: "Maintenance day"
    }
  ];
  