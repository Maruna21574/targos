// server/server.js
// Node.js Express backend pre odosielanie e-mailov cez Websupport SMTP

const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Nastavenie SMTP pre Websupport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.m1.websupport.sk',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER, // napr. info@targos.sk
    pass: process.env.SMTP_PASS
  }
});

// Pomocná funkcia na načítanie a nahradenie šablón
function renderTemplate(templatePath, data) {
  let template = fs.readFileSync(templatePath, 'utf8');
  Object.keys(data).forEach(key => {
    template = template.replace(new RegExp(`{{${key}}}`, 'g'), data[key] || '');
  });
  return template;
}

// API endpoint na prijatie dopytu a odoslanie e-mailov
app.post('/api/send-inquiry', async (req, res) => {
  const { name, email, phone, interest, message } = req.body;
  if (!name || !email || !interest) {
    return res.status(400).json({ error: 'Chýbajú povinné údaje.' });
  }
  try {
    // Priprav dáta pre šablóny
    const templateData = { name, email, phone: phone || '', interest, message };
    // Admin notifikácia
    const adminMail = renderTemplate(
      path.join(__dirname, '../email-templates/admin-notification.txt'),
      templateData
    );
    // Klientské potvrdenie
    const clientMail = renderTemplate(
      path.join(__dirname, '../email-templates/client-confirmation.txt'),
      templateData
    );
    // Odoslať adminovi
    await transporter.sendMail({
      from: `TARGOŠ Web <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: adminMail.match(/^Subject:(.*)$/m)?.[1]?.trim() || 'Nový dopyt',
      text: adminMail.replace(/^Subject:.*\n/, '')
    });
    // Odoslať klientovi
    await transporter.sendMail({
      from: `TARGOŠ Web <${process.env.SMTP_USER}>`,
      to: email,
      subject: clientMail.match(/^Subject:(.*)$/m)?.[1]?.trim() || 'Potvrdenie dopytu',
      text: clientMail.replace(/^Subject:.*\n/, '')
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Chyba pri odosielaní e-mailu.' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`E-mail server beží na porte ${PORT}`);
});
