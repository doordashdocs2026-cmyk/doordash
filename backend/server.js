// server.js
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import handlebars from "handlebars";
import mjml2html from "mjml";
import morgan from "morgan";

import clientsRoutes from "./src/routes/clients.routes.js"; // Rutas clientes

dotenv.config();

const app = express();

// =======================
// MIDDLEWARES
// =======================
app.use(cors({
  origin: "*", // o tu dominio Netlify
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev")); // Logger de peticiones

// =======================
// CONFIGURACIÓN GMAIL
// =======================
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// =======================
// RUTA DE ENVÍO DE EMAIL DE VERIFICACIÓN
// =======================
app.post("/send-email", async (req, res) => {
  const { to, subject, fullName, email } = req.body;

  try {
    const mjmlTemplate = fs.readFileSync("./emails/verification.mjml", "utf8");
    const template = handlebars.compile(mjmlTemplate);
    const mjmlWithData = template({ fullName, email });
    const html = mjml2html(mjmlWithData).html;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject,
      html,
    });

    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// =======================
// RUTA DE ENVÍO DE EMAIL DE BIENVENIDA
// =======================
app.post("/send-welcome", async (req, res) => {
  const { to, fullName } = req.body;

  try {
    const mjmlTemplate = fs.readFileSync("./emails/Welcome.mjml", "utf8");
    const template = handlebars.compile(mjmlTemplate);
    const mjmlWithData = template({ fullName });
    const html = mjml2html(mjmlWithData).html;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject: `¡Bienvenido a DoorDash, ${fullName}!`,
      html,
    });

    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// =======================
// RUTAS PARA CLIENTES
// =======================
app.use("/api", clientsRoutes); // Ahora las rutas quedan en: /api/clients

// =======================
// INICIO DEL SERVIDOR
// =======================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);

app.get("/", (req, res) => {
  res.send("API DoorDash funcionando ✅");
});
