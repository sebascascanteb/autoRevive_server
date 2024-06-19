import { Canceled } from "@prisma/client";


export const invoices = [
    {//1
      userId: 3,
      branchId: 2,
      date: new Date("2024-06-01T12:00:00Z"),
      total: 59.98,
      canceled: Canceled.NO
    },
    {//2
      userId: 3,
      branchId: 2,
      date: new Date("2024-06-02T13:00:00Z"),
      total: 190.97,
      canceled: Canceled.NO
    },
    {//3
      userId: 3,
      branchId: 2,
      date: new Date("2024-06-03T14:00:00Z"),
      total: 59.97,
      canceled: Canceled.YES
    }
  ];
  
  