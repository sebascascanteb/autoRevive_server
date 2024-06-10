import { Role } from "@prisma/client";

export const users = [
  {//1
    name: "Carlos Torres",
    email: "carlos.torres@tallermecanico.com",
    password: "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
    role: Role.ADMIN,
    phone: "555-123-4567",
    exactAddress: "123 Admin St, Mechanic City",
    birthDate: new Date("1980-01-01"),
    branchId: 1
  },
  {//2
    name: "Ana Martinez",
    email: "ana.martinez@tallermecanico.com",
    password: "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
    role: Role.ADMIN,
    phone: "555-234-5678",
    exactAddress: "456 Admin St, Mechanic City",
    birthDate: new Date("1985-02-02"),
    branchId: 2
  },
  {//3
    name: "Luis Perez",
    email: "luis.perez@tallermecanico.com",
    password: "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
    role: Role.CLIENT,
    phone: "555-345-6789",
    exactAddress: "789 Client St, Mechanic Town",
    birthDate: new Date("1990-03-03")
  }
];



