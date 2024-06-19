import { products } from "./products";

export const invoiceDetails = [
    {//1
      invoiceId: 1,
      serviceId: 1,
      date: new Date("2024-06-01T12:30:00Z"),
      quantity: 2,
      subtotal: 29.99
    },
    {//2
      invoiceId: 2,
      serviceId: 2,
      date: new Date("2024-06-02T13:30:00Z"),
      quantity: 1,
      subtotal: 49.99
    },
    {//2
      invoiceId: 2,
      productId: 1,
      date: new Date("2024-06-02T13:30:00Z"),
      quantity: 1,
      subtotal: 79.99
    },
    {//2
        invoiceId: 2,
        productId: 2,
        date: new Date("2024-06-02T13:30:00Z"),
        quantity: 1,
        subtotal: 60.99
      },
    {//3
      invoiceId: 3,
      serviceId: 3,
      date: new Date("2024-06-03T14:30:00Z"),
      quantity: 1,
      subtotal: 19.99
    }
  ];
  