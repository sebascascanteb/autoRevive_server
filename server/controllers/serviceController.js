const {PrismaClient}= require("@prisma/client")

const prisma=new PrismaClient()

module.exports.get=async(request,response, next)=>{
    const services= await prisma.service.findMany()
    response.json(services)
}