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

// Test SMTP spojenia pri štarte servera
// Test SMTP spojenia pri štarte servera (Websupport SMTP, SSL/TLS, port 465)
function testSmtpConnection() {
  const testTransporter = nodemailer.createTransport({
    host: 'smtp.m1.websupport.sk',
    port: 465,
    secure: true,
    auth: {
      user: 'info@targos.sk',
      pass: process.env.SMTP_PASS
    }
  });
  testTransporter.verify(function(error, success) {
    if (error) {
      console.error('SMTP TEST ERROR:', error);
    } else {
      console.log('SMTP TEST SUCCESS: Server is ready to take messages');
    }
  });
}
testSmtpConnection();

// Nastavenie SMTP pre Websupport (SSL/TLS, port 465)
const transporter = nodemailer.createTransport({
  host: 'smtp.m1.websupport.sk',
  port: 465,
  secure: true,
  auth: {
    user: 'info@targos.sk',
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
    // HTML šablóna pre admina
    const adminHtml = `
      <div style="max-width:500px;margin:0 auto;font-family:Arial,sans-serif;background:#fafafa;padding:32px 24px;border-radius:12px;border:1px solid #eee;box-shadow:0 2px 12px #0001;">
        <div style="text-align:center;margin-bottom:24px;">
          <img src='https://www.targos.sk/images/logo.png' alt='TARGOŠ logo' style='height:48px;margin-bottom:8px;' />
          <h2 style="color:#f97316;font-size:22px;margin:0 0 8px 0;letter-spacing:2px;">TARGOŠ STAVEBNÉ PRÁCE</h2>
          <div style="color:#888;font-size:13px;letter-spacing:1px;">Nový dopyt z webu</div>
        </div>
        <div style="background:#fff;border-radius:8px;padding:20px 16px;border:1px solid #f97316;">
          <table style="width:100%;font-size:15px;color:#222;">
            <tr><td style="font-weight:bold;padding:6px 0;width:120px;">Meno:</td><td>${name}</td></tr>
            <tr><td style="font-weight:bold;padding:6px 0;">E-mail:</td><td>${email}</td></tr>
            <tr><td style="font-weight:bold;padding:6px 0;">Telefón:</td><td>${phone}</td></tr>
            <tr><td style="font-weight:bold;padding:6px 0;">Typ projektu:</td><td>${interest}</td></tr>
            <tr><td style="font-weight:bold;padding:6px 0;vertical-align:top;">Správa:</td><td style="white-space:pre-line;">${message}</td></tr>
          </table>
        </div>
        <div style="text-align:center;color:#aaa;font-size:11px;margin-top:32px;">&copy; ${new Date().getFullYear()} TARGOŠ s.r.o. | www.targos.sk</div>
      </div>
    `;
    // HTML šablóna pre klienta
    const clientHtml = `
      <div style="max-width:500px;margin:0 auto;font-family:Arial,sans-serif;background:#fafafa;padding:32px 24px;border-radius:12px;border:1px solid #eee;box-shadow:0 2px 12px #0001;">
        <div style="text-align:center;margin-bottom:24px;">
          <img src='https://www.targos.sk/images/logo.png' alt='TARGOŠ logo' style='height:48px;margin-bottom:8px;' />
          <h2 style="color:#f97316;font-size:22px;margin:0 0 8px 0;letter-spacing:2px;">TARGOŠ STAVEBNÉ PRÁCE</h2>
          <div style="color:#888;font-size:13px;letter-spacing:1px;">Vaša požiadavka bola prijatá</div>
        </div>
        <div style="background:#fff;border-radius:8px;padding:20px 16px;border:1px solid #f97316;">
          <p style="color:#222;font-size:15px;margin-bottom:18px;">Ďakujeme za zaslanie nezáväzného dopytu. Náš tím vás bude kontaktovať v priebehu 24 hodín s prvotným vyjadrením a návrhom termínu obhliadky.</p>
          <table style="width:100%;font-size:15px;color:#222;">
            <tr><td style="font-weight:bold;padding:6px 0;width:120px;">Meno:</td><td>${name}</td></tr>
            <tr><td style="font-weight:bold;padding:6px 0;">E-mail:</td><td>${email}</td></tr>
            <tr><td style="font-weight:bold;padding:6px 0;">Telefón:</td><td>${phone}</td></tr>
            <tr><td style="font-weight:bold;padding:6px 0;">Typ projektu:</td><td>${interest}</td></tr>
            <tr><td style="font-weight:bold;padding:6px 0;vertical-align:top;">Správa:</td><td style="white-space:pre-line;">${message}</td></tr>
          </table>
        </div>
        <div style="text-align:center;color:#aaa;font-size:11px;margin-top:32px;">&copy; ${new Date().getFullYear()} TARGOŠ s.r.o. | www.targos.sk</div>
      </div>
    `;
    // Odoslať adminovi
    await transporter.sendMail({
      from: `TARGOŠ Web <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `Nový dopyt z webu TARGOŠ: ${interest}`,
      html: adminHtml
    });
    // Odoslať klientovi
    await transporter.sendMail({
      from: `TARGOŠ Web <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Ďakujeme za váš dopyt | TARGOŠ',
      html: clientHtml
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
