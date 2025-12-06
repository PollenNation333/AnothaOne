/**
 * Minimal contact backend for Pollen Nation
 *
 * Setup:
 *   npm install express nodemailer
 *   export EMAIL_USER="youremail@example.com"
 *   export EMAIL_PASS="your-app-password"
 *   export DEST_EMAIL="pollennationco@gmail.com"
 *   node server.js
 *
 * Access form at: http://localhost:3000/contact.html
 */
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, preferredContactMethod, message } = req.body || {};

  if (!name || !message || (!email && !phone)) {
    return res.status(400).json({
      success: false,
      error: 'Please provide name, message, and at least an email or phone number.'
    });
  }

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const dest = process.env.DEST_EMAIL || 'pollennationco@gmail.com';

  if (!user || !pass) {
    return res.status(500).json({
      success: false,
      error: 'Email is not configured on the server.'
    });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user, pass }
  });

  const bodyLines = [
    `Name: ${name}`,
    email ? `Email: ${email}` : null,
    phone ? `Phone: ${phone}` : null,
    `Preferred contact: ${preferredContactMethod || 'Not specified'}`,
    '',
    'Message:',
    message
  ].filter(Boolean).join('\n');

  try {
    await transporter.sendMail({
      from: user,
      to: dest,
      subject: 'New contact form submission from Pollen Nation',
      text: bodyLines
    });

    return res.json({ success: true });
  } catch (err) {
    console.error('Email send failed:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to send email.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Contact server running on http://localhost:${PORT}`);
});
