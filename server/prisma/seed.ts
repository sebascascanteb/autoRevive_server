import { PrismaClient } from "@prisma/client";
import { serviceTypes } from "./seeds/serviceTypes";
import { productCategories } from "./seeds/productCategories";
import { branches } from "./seeds/branches";
import { users } from "./seeds/users";
import { services } from "./seeds/services";
import { products } from "./seeds/products";
import { reservations } from "./seeds/reservations";
import { invoices } from "./seeds/invoices";
import { invoiceDetails } from "./seeds/invoiceDetails";
import { schedules } from "./seeds/schedules";
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
        clientId: 3,
        branchId: 2,
        serviceId: 1,
        date: new Date("2024-06-01T08:00:00Z"),
        startTime: new Date("2024-06-01T10:00:00Z"),
        endTime: new Date("2024-06-01T10:30:00Z"),
        statusId: 1,
        answer1: "Yes",
        answer2: "No",
        answer3: "N/A"
    },
  });
  await prisma.reservation.create({
    data: {
        clientId: 4,
        branchId: 2,
        serviceId: 2,
        date: new Date("2024-06-03T08:00:00Z"),
        startTime: new Date("2024-06-03T10:00:00Z"),
        endTime: new Date("2024-06-03T10:30:00Z"),
        statusId: 2,
        answer1: "Yes",
        answer2: "No",
        answer3: "N/A"
    },
  });
  await prisma.reservation.create({
    data: {
        clientId: 4,
        branchId: 2,
        serviceId: 3,
        date: new Date("2024-06-07T08:00:00Z"),
        startTime: new Date("2024-06-07T10:00:00Z"),
        endTime: new Date("2024-06-07T10:30:00Z"),
        statusId: 4,
        answer1: "Yes",
        answer2: "No",
        answer3: "N/A"
    },
  });



  await prisma.reservation.create({
    data: {
        clientId: 3,
        branchId: 2,
        serviceId: 1,
        date: new Date("2024-06-02T10:00:00Z"),
        startTime: new Date("2024-06-02T11:00:00Z"),
        endTime: new Date("2024-06-02T12:00:00Z"),
        statusId: 6,
        answer1: "No",
        answer2: "Yes",
        answer3: "N/A"
    },
  });
  await prisma.reservation.create({
    data: {
        clientId: 4,
        branchId: 2,
        serviceId: 2,
        date: new Date("2024-06-03T07:00:00Z"),
        startTime: new Date("2024-06-03T09:00:00Z"),
        endTime: new Date("2024-06-03T09:20:00Z"),
        statusId: 3,
        answer1: "Yes",
        answer2: "Yes",
        answer3: "Yes"
    },
  });
  await prisma.reservation.create({
    data: {
        clientId: 3,
        branchId: 2,
        serviceId: 3,
        date: new Date(Date.UTC(2024, 4, 1, 8, 0, 0)), // 1 de junio de 2024 a las 08:00 UTC
        startTime: new Date(Date.UTC(2024, 5, 1, 10, 0, 0)), // 1 de junio de 2024 a las 10:00 UTC
        endTime: new Date(Date.UTC(2024, 5, 1, 11, 0, 0)), 
        statusId: 5,
        answer1: "Yes",
        answer2: "Yes",
        answer3: "Yes"
    },
  });



  await prisma.reservation.create({
    data: {
        clientId: 4,
        branchId: 3,
        serviceId: 3,
        date: new Date("2024-06-03T05:00:00Z"),
        startTime: new Date("2024-06-03T09:00:00Z"),
        endTime: new Date("2024-06-03T09:20:00Z"),
        statusId: 5,
        answer1: "Yes",
        answer2: "Yes",
        answer3: "Yes"
    },
  });  await prisma.reservation.create({
    data: {
        clientId: 3,
        branchId: 3,
        serviceId: 2,
        date: new Date("2024-06-06T05:00:00Z"),
        startTime: new Date("2024-06-06T09:00:00Z"),
        endTime: new Date("2024-06-06T09:20:00Z"),
        statusId: 2,
        answer1: "Yes",
        answer2: "Yes",
        answer3: "Yes"
    },
  });  await prisma.reservation.create({
    data: {
        clientId: 4,
        branchId: 3,
        serviceId: 1,
        date: new Date("2024-06-01T05:00:00Z"),
        startTime: new Date("2024-06-01T09:00:00Z"),
        endTime: new Date("2024-06-01T09:20:00Z"),
        statusId: 1,
        answer1: "Yes",
        answer2: "Yes",
        answer3: "Yes"
    },
  });

  // Seed Invoices
  await prisma.invoice.create({
    data: {
        userId: 3,
        branchId: 2,
        date: new Date("2024-06-01T12:00:00Z"),
      total: 59.98,
      canceled: "NO"
    },
  });
  await prisma.invoice.create({
    data: {
        userId: 4,
        branchId: 2,
        date: new Date("2024-06-02T13:00:00Z"),
        total: 190.97,
        canceled: "NO"
    },
  }); 
  await prisma.invoice.create({
    data: {
        userId: 3,
        branchId: 2,
        date: new Date("2024-06-03T14:00:00Z"),
      total: 59.97,
      canceled: "YES"
    },
  });
  await prisma.invoice.create({
    data: {
      userId: 3,
      branchId: 2,
      date: new Date("2024-06-07T18:00:00Z"),
      total: 120,
      canceled: "NO"
    }
  });
  
  // Creación de factura con userId 4 y branchId 2
  await prisma.invoice.create({
    data: {
      userId: 4,
      branchId: 2,
      date: new Date("2024-06-08T19:00:00Z"),
      total: 88,
      canceled: "YES"
    }
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
      startDate: new Date("2024-06-01T08:00:00Z"),
      endDate: new Date("2024-06-01T17:00:00Z"),
      description: "Regular working hours"
    },
  });
  await prisma.schedule.create({
    data: {
        branchId: 2,
      availability: "SCHEDULE",
      startDate: new Date("2024-06-02T08:00:00Z"),
      endDate: new Date("2024-06-02T17:00:00Z"),
      description: "Regular working hours"
    },
  });
  await prisma.schedule.create({
    data: {
        branchId: 3,
      availability: "BLOCK",
      startDate: new Date("2024-06-03T08:00:00Z"),
      endDate: new Date("2024-06-03T17:00:00Z"),
      description: "Maintenance day"
    },
  });
  await prisma.schedule.create({
    data: {
        branchId: 2,
      availability: "BLOCK",
      startDate: new Date("2024-06-20T08:00:00Z"),
      endDate: new Date("2024-06-20T17:00:00Z"),
      description: "Maintenance day"
    },
  });
} catch (error) {
    throw error;
  }
};
main().catch((err) => {
  console.warn('Error al ejecutar el seeder:\n', err);
});
