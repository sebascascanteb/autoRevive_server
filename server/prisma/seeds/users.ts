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
  },
  {//2
    name: "Ana Martinez",
    email: "ana.martinez@tallermecanico.com",
    password: "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
    role: Role.MANAGER,
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
  },
  {//4
    name: "Andrey Ramirez",
    email: "andrey.ramirez@tallermecanico.com",
    password: "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
    role: Role.CLIENT,
    phone: "555-346-6788",
    exactAddress: "Greacia, Alajuela",
    birthDate: new Date("2003-03-03")
  },
  {//5
    name: "María Gómez",
    email: "maria.gomez@tallermecanico.com",
    password: "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
    role: Role.MANAGER,
    phone: "555-456-7890",
    exactAddress: "123 Manager St, Mechanic City",
    birthDate: new Date("1982-04-04"),
    branchId: null
  },
  {//6
    name: "José López",
    email: "jose.lopez@tallermecanico.com",
    password: "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
    role: Role.MANAGER,
    phone: "555-567-8901",
    exactAddress: "456 Mechanic St, Mechanic City",
    birthDate: new Date("1978-05-05"),
    branchId: 4
  },
  {//7
    name: "Lucía Fernández",
    email: "lucia.fernandez@tallermecanico.com",
    password: "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
    role: Role.MANAGER,
    phone: "555-678-9012",
    exactAddress: "789 Mechanic St, Mechanic Town",
    birthDate: new Date("1995-06-06"),
    branchId: 1
  },
  {//8
    name: "Fernando Hernández",
    email: "fernando.hernandez@tallermecanico.com",
    password: "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
    role: Role.MANAGER,
    phone: "555-789-0123",
    exactAddress: "Greacia, Alajuela",
    birthDate: new Date("1990-07-07"),
    branchId: null
  },
  {//9
    name: "Paula Rodríguez",
    email: "paula.rodriguez@tallermecanico.com",
    password: "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
    role: Role.CLIENT,
    phone: "555-890-1234",
    exactAddress: "123 Mechanic St, Mechanic City",
    birthDate: new Date("1988-08-08"),
  },
  {//10
    name: "Juan Cruz",
    email: "juan.cruz@tallermecanico.com",
    password: "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
    role: Role.MANAGER,
    phone: "555-901-2345",
    exactAddress: "456 Admin St, Mechanic City",
    birthDate: new Date("1975-09-09"),
    branchId: null
  },
  {
  name: "Gabriela Ortega",
  email: "gabriela.ortega@tallermecanico.com",
  password: "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
  role: Role.MANAGER,
  phone: "555-012-3456",
  exactAddress: "789 Admin Ave, Mechanic City",
  birthDate: new Date("1986-10-10"),
  branchId: null
},
{
  name: "Ricardo Gómez",
  email: "ricardo.gomez@tallermecanico.com",
  password: "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
  role: Role.MANAGER,
  phone: "555-123-4568",
  exactAddress: "321 Admin Blvd, Mechanic City",
  birthDate: new Date("1983-11-11"),
  branchId: null
},
{
  name: "Isabel Castro",
  email: "isabel.castro@tallermecanico.com",
  password: "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
  role: Role.MANAGER,
  phone: "555-234-5679",
  exactAddress: "654 Admin Rd, Mechanic Town",
  birthDate: new Date("1990-12-12"),
  branchId: null
},
{
  name: "Eduardo Vargas",
  email: "eduardo.vargas@tallermecanico.com",
  password: "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
  role: Role.MANAGER,
  phone: "555-345-6780",
  exactAddress: "987 Admin Ave, Mechanic City",
  birthDate: new Date("1979-01-01"),
  branchId: null
},
{
  name: "Natalia Ramírez",
  email: "natalia.ramirez@tallermecanico.com",
  password: "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
  role: Role.MANAGER,
  phone: "555-456-7891",
  exactAddress: "543 Admin Ln, Mechanic City",
  birthDate: new Date("1988-02-02"),
  branchId: null
}
];
