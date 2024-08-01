import { PrismaClient } from "@prisma/client";
import { serviceTypes } from "./seeds/serviceTypes";
import { productCategories } from "./seeds/productCategories";
import { branches } from "./seeds/branches";
import { users } from "./seeds/users";
import { services } from "./seeds/services";
import { products } from "./seeds/products";
import { invoiceDetails } from "./seeds/invoiceDetails";
import { status } from "./seeds/status";

const prisma = new PrismaClient();

const main =async () => {
    try{
  // Seed ServiceTypes
  await prisma.serviceType.createMany({
    data: serviceTypes,
  });

  await prisma.status.createMany({
    data: status,
  });

  // Seed ProductCategories
  await prisma.productCategory.createMany({
    data: productCategories,
  });

  // Seed Branches
  await prisma.branch.createMany({
    data: branches,
  });

  // Seed Users
  await prisma.user.createMany({
    data: users,
  });

  // Seed Services
  await prisma.service.createMany({
    data: services,
  });

  // Seed Products
  await prisma.product.createMany({
    data: products,
  });

 // Seed Reservations

await prisma.reservation.create({
  data: {
    clientId: 3, // Luis Perez
    branchId: 2,
    serviceId: 1, // Standard Oil Change
    date: new Date("2024-08-01T08:00:00Z"),
    startTime: new Date("2024-08-01T09:00:00Z"),
    endTime: new Date("2024-08-01T09:30:00Z"),
    statusId: 1, // e.g., Scheduled
    answer1: "Yes",
    answer2: "No",
    answer3: "N/A"
  },
});

await prisma.reservation.create({
  data: {
    clientId: 4, // Andrey Ramirez
    branchId: 2,
    serviceId: 2, // Brake Inspection
    date: new Date("2024-08-03T08:00:00Z"),
    startTime: new Date("2024-08-03T10:00:00Z"),
    endTime: new Date("2024-08-03T10:30:00Z"),
    statusId: 2, // e.g., Completed
    answer1: "Yes",
    answer2: "No",
    answer3: "N/A"
  },
});

await prisma.reservation.create({
  data: {
    clientId: 4, // Andrey Ramirez
    branchId: 2,
    serviceId: 3, // Tire Rotation
    date: new Date("2024-08-07T08:00:00Z"),
    startTime: new Date("2024-08-07T10:00:00Z"),
    endTime: new Date("2024-08-07T10:30:00Z"),
    statusId: 4, // e.g., Canceled
    answer1: "Yes",
    answer2: "No",
    answer3: "N/A"
  },
});

await prisma.reservation.create({
  data: {
    clientId: 3, // Luis Perez
    branchId: 2,
    serviceId: 1, // Standard Oil Change
    date: new Date("2024-08-02T10:00:00Z"),
    startTime: new Date("2024-08-02T11:00:00Z"),
    endTime: new Date("2024-08-02T11:30:00Z"),
    statusId: 6, // e.g., Rescheduled
    answer1: "No",
    answer2: "Yes",
    answer3: "N/A"
  },
});

await prisma.reservation.create({
  data: {
    clientId: 4, // Andrey Ramirez
    branchId: 2,
    serviceId: 2, // Brake Inspection
    date: new Date("2024-08-03T07:00:00Z"),
    startTime: new Date("2024-08-03T08:00:00Z"),
    endTime: new Date("2024-08-03T08:30:00Z"),
    statusId: 3, // e.g., In Progress
    answer1: "Yes",
    answer2: "Yes",
    answer3: "Yes"
  },
});

await prisma.reservation.create({
  data: {
    clientId: 3, // Luis Perez
    branchId: 2,
    serviceId: 3, // Tire Rotation
    date: new Date("2024-08-01T08:00:00Z"),
    startTime: new Date("2024-08-01T10:00:00Z"),
    endTime: new Date("2024-08-01T11:00:00Z"),
    statusId: 5, // e.g., Completed
    answer1: "Yes",
    answer2: "Yes",
    answer3: "Yes"
  },
});

await prisma.reservation.create({
  data: {
    clientId: 4, // Andrey Ramirez
    branchId: 3,
    serviceId: 3, // Tire Rotation
    date: new Date("2024-08-03T05:00:00Z"),
    startTime: new Date("2024-08-03T06:00:00Z"),
    endTime: new Date("2024-08-03T06:30:00Z"),
    statusId: 5, // e.g., Completed
    answer1: "Yes",
    answer2: "Yes",
    answer3: "Yes"
  },
});

await prisma.reservation.create({
  data: {
    clientId: 3, // Luis Perez
    branchId: 3,
    serviceId: 2, // Brake Inspection
    date: new Date("2024-08-06T05:00:00Z"),
    startTime: new Date("2024-08-06T06:00:00Z"),
    endTime: new Date("2024-08-06T06:30:00Z"),
    statusId: 2, // e.g., Completed
    answer1: "Yes",
    answer2: "Yes",
    answer3: "Yes"
  },
});

await prisma.reservation.create({
  data: {
    clientId: 4, // Andrey Ramirez
    branchId: 3,
    serviceId: 1, // Standard Oil Change
    date: new Date("2024-08-01T05:00:00Z"),
    startTime: new Date("2024-08-01T09:00:00Z"),
    endTime: new Date("2024-08-01T09:30:00Z"),
    statusId: 1, // e.g., Scheduled
    answer1: "Yes",
    answer2: "Yes",
    answer3: "Yes"
  },
});


  // Seed Invoices with detailed breakdown

await prisma.invoice.create({
  data: {
    userId: 3, // Luis Perez
    branchId: 2,
    date: new Date("2024-08-01T12:00:00Z"),
    total: 77.97, // Standard Oil Change x1
    canceled: "NO"
  },
});

await prisma.invoice.create({
  data: {
    userId: 4, // Andrey Ramirez
    branchId: 2,
    date: new Date("2024-08-03T13:00:00Z"),
    total: 239.98, // Brake Inspection x1 + Tire Rotation x1
    canceled: "NO"
  },
});

await prisma.invoice.create({
  data: {
    userId: 4, // Andrey Ramirez
    branchId: 2,
    date: new Date("2024-08-07T14:00:00Z"),
    total: 159.97, // Tire Rotation x1
    canceled: "YES"
  },
});

await prisma.invoice.create({
  data: {
    userId: 3, // Luis Perez
    branchId: 3,
    date: new Date("2024-08-10T18:00:00Z"),
    total: 149.96, // Brake Inspection x1
    canceled: "NO"
  },
});

await prisma.invoice.create({
  data: {
    userId: 4, // Andrey Ramirez
    branchId: 3,
    date: new Date("2024-08-15T19:00:00Z"),
    total: 29.99, // Battery x1
    canceled: "NO"
  },
});




  // Seed InvoiceDetails
  for (const invoiceDetail of invoiceDetails) {
    await prisma.invoiceDetail.create({ data: invoiceDetail });
  }

 // Seed Schedules

await prisma.schedule.create({
  data: {
    branchId: 1,
    availability: "SCHEDULE",
    startDate: new Date("2024-08-01T08:00:00Z"),
    endDate: new Date("2024-08-01T16:00:00Z"),
    description: "Opening hours for August 1st"
  },
});

await prisma.schedule.create({
  data: {
    branchId: 1,
    availability: "BLOCK",
    startDate: new Date("2024-08-02T12:00:00Z"),
    endDate: new Date("2024-08-02T14:00:00Z"),
    description: "Lunch break block"
  },
});

await prisma.schedule.create({
  data: {
    branchId: 2,
    availability: "SCHEDULE",
    startDate: new Date("2024-08-05T09:00:00Z"),
    endDate: new Date("2024-08-05T17:00:00Z"),
    description: "Regular working hours"
  },
});

await prisma.schedule.create({
  data: {
    branchId: 2,
    availability: "BLOCK",
    startDate: new Date("2024-08-08T09:00:00Z"),
    endDate: new Date("2024-08-08T11:00:00Z"),
    description: "Staff meeting"
  },
});

await prisma.schedule.create({
  data: {
    branchId: 3,
    availability: "SCHEDULE",
    startDate: new Date("2024-08-10T08:00:00Z"),
    endDate: new Date("2024-08-10T12:00:00Z"),
    description: "Opening hours for August 10th"
  },
});

await prisma.schedule.create({
  data: {
    branchId: 3,
    availability: "BLOCK",
    startDate: new Date("2024-08-12T13:00:00Z"),
    endDate: new Date("2024-08-12T15:00:00Z"),
    description: "Inventory check"
  },
});

await prisma.schedule.create({
  data: {
    branchId: 4,
    availability: "SCHEDULE",
    startDate: new Date("2024-08-15T10:00:00Z"),
    endDate: new Date("2024-08-15T18:00:00Z"),
    description: "Opening hours for August 15th"
  },
});

await prisma.schedule.create({
  data: {
    branchId: 4,
    availability: "BLOCK",
    startDate: new Date("2024-08-17T08:00:00Z"),
    endDate: new Date("2024-08-17T10:00:00Z"),
    description: "System maintenance"
  },
});


// Seed Schedules

await prisma.schedule.create({
  data: {
    branchId: 1,
    availability: "SCHEDULE",
    startDate: new Date("2024-08-03T07:00:00Z"),
    endDate: new Date("2024-08-03T15:00:00Z"),
    description: "Opening hours for August 3rd"
  },
});

await prisma.schedule.create({
  data: {
    branchId: 1,
    availability: "BLOCK",
    startDate: new Date("2024-08-04T11:00:00Z"),
    endDate: new Date("2024-08-04T13:00:00Z"),
    description: "Staff lunch break"
  },
});

await prisma.schedule.create({
  data: {
    branchId: 2,
    availability: "SCHEDULE",
    startDate: new Date("2024-08-07T09:00:00Z"),
    endDate: new Date("2024-08-07T17:00:00Z"),
    description: "Regular working hours"
  },
});

await prisma.schedule.create({
  data: {
    branchId: 2,
    availability: "BLOCK",
    startDate: new Date("2024-08-09T12:00:00Z"),
    endDate: new Date("2024-08-09T14:00:00Z"),
    description: "Maintenance block"
  },
});

await prisma.schedule.create({
  data: {
    branchId: 3,
    availability: "SCHEDULE",
    startDate: new Date("2024-08-11T08:00:00Z"),
    endDate: new Date("2024-08-11T16:00:00Z"),
    description: "Opening hours for August 11th"
  },
});

await prisma.schedule.create({
  data: {
    branchId: 3,
    availability: "BLOCK",
    startDate: new Date("2024-08-13T10:00:00Z"),
    endDate: new Date("2024-08-13T12:00:00Z"),
    description: "Team meeting"
  },
});

await prisma.schedule.create({
  data: {
    branchId: 4,
    availability: "SCHEDULE",
    startDate: new Date("2024-08-16T08:00:00Z"),
    endDate: new Date("2024-08-16T15:00:00Z"),
    description: "Opening hours for August 16th"
  },
});

await prisma.schedule.create({
  data: {
    branchId: 4,
    availability: "BLOCK",
    startDate: new Date("2024-08-18T14:00:00Z"),
    endDate: new Date("2024-08-18T16:00:00Z"),
    description: "System upgrade"
  },
});

await prisma.schedule.create({
  data: {
    branchId: 1,
    availability: "SCHEDULE",
    startDate: new Date("2024-08-20T10:00:00Z"),
    endDate: new Date("2024-08-20T18:00:00Z"),
    description: "Opening hours for August 20th"
  },
});

await prisma.schedule.create({
  data: {
    branchId: 2,
    availability: "BLOCK",
    startDate: new Date("2024-08-22T13:00:00Z"),
    endDate: new Date("2024-08-22T15:00:00Z"),
    description: "Staff training"
  },
});

await prisma.schedule.create({
  data: {
    branchId: 3,
    availability: "SCHEDULE",
    startDate: new Date("2024-08-25T07:00:00Z"),
    endDate: new Date("2024-08-25T15:00:00Z"),
    description: "Opening hours for August 25th"
  },
});

await prisma.schedule.create({
  data: {
    branchId: 4,
    availability: "BLOCK",
    startDate: new Date("2024-08-28T08:00:00Z"),
    endDate: new Date("2024-08-28T10:00:00Z"),
    description: "Cleaning block"
  },
});


} catch (error) {
    throw error;
  }
};
main().catch((err) => {
  console.warn('Error al ejecutar el seeder:\n', err);
});
