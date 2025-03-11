import { products } from "./products";

export const invoiceDetails = [
  {//1
    invoiceId: 1,
    serviceId: 1,
    date: new Date("2024-07-01T09:30:00Z"),
    quantity: 3,
    subtotal: 77.97
  },
  {//2
    invoiceId: 2,
    serviceId: 4,
    date: new Date("2024-07-02T10:00:00Z"),
    quantity: 1,
    subtotal: 119.99
  },
  {//2
    invoiceId: 2,
    productId: 4,
    date: new Date("2024-07-02T10:00:00Z"),
    quantity: 1,
    subtotal: 119.99
  },
  {//3
    invoiceId: 3,
    productId: 5,
    date: new Date("2024-07-03T11:00:00Z"),
    quantity: 2,
    subtotal: 79.98
  },
  {//3
    invoiceId: 3,
    serviceId: 6,
    date: new Date("2024-07-03T11:00:00Z"),
    quantity: 1,
    subtotal: 79.99
  },
  {//4
    invoiceId: 4,
    productId: 7,
    date: new Date("2024-07-04T12:00:00Z"),
    quantity: 1,
    subtotal: 29.99
  },
  {//4
    invoiceId: 4,
    serviceId: 8,
    date: new Date("2024-07-04T12:00:00Z"),
    quantity: 1,
    subtotal: 39.99
  },
  {//4
    invoiceId: 4,
    productId: 8,
    date: new Date("2024-07-04T12:00:00Z"),
    quantity: 2,
    subtotal: 79.98
  },
  {//5
    invoiceId: 5,
    serviceId: 1,
    date: new Date("2024-07-05T13:30:00Z"),
    quantity: 1,
    subtotal: 29.99
  }
];
