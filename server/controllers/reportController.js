const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

module.exports.getMostSoldProducts= async (request, response, next) =>{
    const result = await prisma.$queryRaw(
        Prisma.sql`SELECT p.name AS product_name,
        SUM(id.quantity) AS total_quantity_sold
        FROM InvoiceDetail id
        JOIN Product p ON id.productId = p.id
        JOIN Invoice i on id.invoiceId = i.id
        WHERE id.productId IS NOT NULL
        GROUP BY p.name
        ORDER BY total_quantity_sold DESC
        LIMIT 3;`
    );
    response.json(result);

}


module.exports.getMostSoldServices= async (request, response, next) =>{
    const result = await prisma.$queryRaw(
        Prisma.sql`SELECT s.name AS service_name,
        SUM(id.quantity) AS total_quantity_sold
        FROM InvoiceDetail id
        JOIN Service s ON id.serviceId = s.id
        JOIN Invoice i on id.invoiceId = i.id
        WHERE id.serviceId IS NOT NULL
        GROUP BY s.name
        ORDER BY total_quantity_sold DESC
        LIMIT 3;`
    );
    response.json(result);

}

module.exports.getReservationPerBranch= async (request, response, next) =>{
    const result = await prisma.$queryRaw(
        Prisma.sql`SELECT b.name AS branch_name
        COUNT(r.id) AS appointment_count
        FROM Reservation r
        JOIN Branch b ON r.branchId = b.id
        WHERE DATE(r.date) = CURDATE()
        GROUP BY b.name`
    );
    response.json(result);

}

module.exports.getReservationPerBranchManager= async (request, response, next) =>{
    const req = request.params;
    const result = await prisma.$queryRaw(
        Prisma.sql
    );
    response.json(result);

}


