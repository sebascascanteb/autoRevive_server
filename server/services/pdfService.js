const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class PDFService {
  constructor() {}

  async createInvoicePDF(invoice, user, invoiceDetails) {
    return new Promise(async (resolve, reject) => {
      const dirPath = path.join(__dirname, '../invoices');
      const fileName = `invoice-${invoice.id}.pdf`;
      const filePath = path.join(dirPath, fileName);

      // Crear el directorio si no existe
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // Define the HTML content
      const content = `
      <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
            background-color: #f4f4f4;
          }
          .invoice-container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 800px;
            margin: auto;
          }
          .header {
            text-align: center;
            padding: 10px;
            background: #003366;
            color: #ffffff;
            border-radius: 8px 8px 0 0;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
          }
          .section {
            margin: 20px 0;
            padding: 10px;
            border-bottom: 1px solid #cccccc;
          }
          .section h2 {
            margin: 0 0 10px 0;
            color: #003366;
            font-size: 20px;
          }
          .content {
            font-size: 14px;
          }
          .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          .details-table th, .details-table td {
            border: 1px solid #cccccc;
            padding: 8px;
            text-align: left;
          }
          .details-table th {
            background-color: #f8f8f8;
            color: #003366;
          }
          .total {
            text-align: right;
            font-size: 18px;
            font-weight: bold;
            padding: 10px;
            background: #f8f8f8;
            border-radius: 0 0 8px 8px;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="header">
            <h1>Invoice #${invoice.id}</h1>
            <p>Date: ${invoice.date.toISOString().split('T')[0]}</p>
            <p>Branch: ${invoice.branch.name}</p>
          </div>
          <div class="section">
            <h2>Customer Information</h2>
            <div class="content">
              <p><strong>Name:</strong> ${user.name}</p>
              <p><strong>Phone:</strong> ${user.phone}</p>
              <p><strong>Email:</strong> ${user.email}</p>
            </div>
          </div>
          <div class="section">
            <h2>Invoice Details</h2>
            <table class="details-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>IVA</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${invoiceDetails.map((item, index) => `
                  <tr>
                    <td>${item.service ? item.service.name : item.product.name}</td>
                    <td>${item.quantity}</td>
                    <td>$${(item.subtotal - (item.subtotal * 0.13)).toFixed(2)}</td>
                    <td>$${(item.subtotal * 0.13).toFixed(2)}</td>
                    <td>$${item.subtotal.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <div class="total">
            <p>Total: $${invoice.total.toFixed(2)}</p>
          </div>
        </div>
        <div class="footer">
          <p>Thank you for your business!</p>
          <p>For questions, please contact us at autorevive@gmail.com</p>
        </div>
      </body>
      </html>`;

      await page.setContent(content);
      await page.pdf({ path: filePath, format: 'A4' });

      await browser.close();

      resolve(filePath);
    });
  }
}

module.exports = new PDFService();
