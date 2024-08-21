const { PrismaClient } = require('@prisma/client');
const { connect } = require('http2');
const prisma = new PrismaClient();
const emailService = require('../services/emailService.js');
const pdfService = require('../services/pdfService.js'); 




// Obtener listado
module.exports.get = async (req, res, next) => {
  try {
    const listado = await prisma.invoiceDetail.findMany({
      orderBy: { id: 'asc' },
    });
    res.json(listado);
  } catch (error) {
    next(error);
  }
};

// Obtener por Id
//localhost:3000/invoiceDetail/3
module.exports.getById = async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    const obj = await prisma.invoiceDetail.findFirst({
      where: { id: id },
    });
    res.json(obj);
  } catch (error) {
    next(error);
  }
};



module.exports.create = async (req, res, next) => {
  try {
    const body = req.body;

    // Valida los campos requeridos
    if (!body.invoiceId || !body.date || !body.quantity || !body.subtotal) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    const data = {
      invoice: {
        connect: { id: body.invoiceId },
      },
      date: new Date(body.date),
      quantity: body.quantity,
      subtotal: body.subtotal,
    };

    if (body.serviceId) {
      data.service = {
        connect: { id: body.serviceId },
      };
    }
    
    if (body.productId) {
      data.product = {
        connect: { id: body.productId },
      };
    }

    const invoiceDetail = await prisma.invoiceDetail.create({ data });

    // Obtener la factura completa con detalles
    const invoice = await prisma.invoice.findUnique({
      where: { id: body.invoiceId },
      include: {
        user: true,
        branch: true,
        invoiceDetails: {
          include: {
            service: true,
            product: true
          }
        }
      }
    });

    if (!invoice) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }

    // Generar PDF
    const pdfPath = await pdfService.createInvoicePDF(invoice, invoice.user, invoice.invoiceDetails);

    // Enviar correo con el PDF adjunto
    const message = {
      from: 'AutoRevive <sebascascanteb03@gmail.com>',
      to: invoice.user.email,
      subject: 'Your Invoice from AutoRevive',
      html: `
        <p>Hello ${invoice.user.name},</p>
        <p>Thank you for your business. Attached is your invoice #${invoice.id}.</p>
        <p>Total Amount: $${invoice.total.toFixed(2)}</p>
        <p>Best regards,<br>AutoRevive Team</p>
      `,
      attachments: [
        {
          filename: `invoice-${invoice.id}.pdf`,
          path: pdfPath,
          contentType: 'application/pdf'
        }
      ]
    };

    await emailService.sendEmail(message);

    res.status(201).json(invoiceDetail);
  } catch (error) {
    console.error('Error al crear el detalle de la factura y enviar el correo:', error);
    next(error);
  }
};


// Actualizar
module.exports.update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    let body = req.body;
    const obj = await prisma.invoiceDetail.update({
      where: { id },
      data: {
        invoiceId: body.invoiceId,
        serviceId: body.serviceId,
        productId: body.productId,
        date: body.date,
        quantity: body.quantity,
        subtotal: body.subtotal,
      },
    });
    res.json(obj);
  } catch (error) {
    next(error);
  }
};

// Eliminar
module.exports.delete = async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    const obj = await prisma.invoiceDetail.delete({
      where: { id },
    });
    res.json(obj);
  } catch (error) {
    next(error);
  }
};
