import { NextResponse } from "next/server";

// ─────────────────────────────────────────────────────────────────────────────
// API de contacto — envía el formulario por correo usando Mailjet (Send API v3.1)
//
// Variables de entorno necesarias (en .env.local):
//   MAILJET_API_KEY     — API Key (pública) de Mailjet
//   MAILJET_SECRET_KEY  — Secret Key (privada) de Mailjet
//   MAILJET_FROM_EMAIL  — correo remitente VALIDADO en Mailjet
//   MAILJET_TO_EMAIL    — correo(s) donde se reciben las solicitudes
// ─────────────────────────────────────────────────────────────────────────────

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  message?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const apiKey = process.env.MAILJET_API_KEY;
  const secretKey = process.env.MAILJET_SECRET_KEY;
  const fromEmail = process.env.MAILJET_FROM_EMAIL;
  const toEmail = process.env.MAILJET_TO_EMAIL;

  if (!apiKey || !secretKey || !fromEmail || !toEmail) {
    return NextResponse.json(
      { success: false, error: "Mailjet no está configurado." },
      { status: 500 }
    );
  }

  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Solicitud inválida." },
      { status: 400 }
    );
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const projectType = (body.projectType ?? "").trim();
  const message = (body.message ?? "").trim();

  // Validación mínima
  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, error: "Faltan campos obligatorios." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { success: false, error: "Correo inválido." },
      { status: 400 }
    );
  }

  const fecha = new Date().toLocaleString("es-MX", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Mexico_City",
  });

  const html = buildEmailHtml({
    name: escapeHtml(name),
    email: escapeHtml(email),
    phone: escapeHtml(phone || "No proporcionado"),
    projectType: escapeHtml(projectType || "No especificado"),
    message: escapeHtml(message).replace(/\n/g, "<br />"),
    fecha,
  });

  const text =
    `Nueva solicitud de proyecto — ${name}\n\n` +
    `Nombre: ${name}\nCorreo: ${email}\nTeléfono: ${phone || "No proporcionado"}\n` +
    `Tipo de proyecto: ${projectType || "No especificado"}\n\nMensaje:\n${message}\n\n` +
    `Recibida el ${fecha}`;

  const auth = Buffer.from(`${apiKey}:${secretKey}`).toString("base64");

  try {
    const res = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        Messages: [
          {
            From: { Email: fromEmail, Name: "Constructora OLIVO — Web" },
            To: toEmail
              .split(",")
              .map((e) => ({ Email: e.trim() })),
            ReplyTo: { Email: email, Name: name },
            Subject: `🏗️ Nueva solicitud de proyecto — ${name}`,
            TextPart: text,
            HTMLPart: html,
          },
        ],
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Mailjet error:", res.status, detail);
      return NextResponse.json(
        { success: false, error: "No se pudo enviar el correo." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Mailjet request failed:", err);
    return NextResponse.json(
      { success: false, error: "Error de red al enviar." },
      { status: 502 }
    );
  }
}

function buildEmailHtml(d: {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  fecha: string;
}): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background-color:#f3f1ec;font-family:Arial,Helvetica,sans-serif;color:#1b1b17;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Nueva solicitud de ${d.name} — ${d.projectType}. Responde cuanto antes.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f1ec;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(27,27,23,0.08);">
        <tr><td style="height:5px;background-color:#2f5d3a;line-height:5px;font-size:0;">&nbsp;</td></tr>
        <tr><td style="background-color:#1e1e1b;padding:36px 32px;color:#f3f1ec;text-align:center;">
          <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto 16px;"><tr>
            <td style="width:56px;height:56px;background-color:#2f5d3a;border-radius:50%;text-align:center;vertical-align:middle;font-size:26px;line-height:56px;">🏗️</td>
          </tr></table>
          <p style="margin:0;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#9aa893;">Constructora OLIVO</p>
          <h1 style="margin:10px 0 0;font-size:24px;line-height:1.25;font-weight:700;color:#ffffff;">Nueva solicitud de proyecto</h1>
          <p style="margin:8px 0 0;font-size:13px;color:#b9b6ac;">Recibida el ${d.fecha}</p>
        </td></tr>
        <tr><td style="padding:28px 32px 4px;">
          <p style="margin:0 0 16px;font-size:15px;line-height:1.55;color:#4a4a44;"><strong style="color:#1b1b17;">${d.name}</strong> está interesado en trabajar con ustedes. A continuación están sus datos de contacto y los detalles de su proyecto.</p>
          <span style="display:inline-block;background-color:#e7ede3;color:#2f5d3a;font-size:13px;font-weight:700;padding:7px 16px;border-radius:999px;">${d.projectType}</span>
        </td></tr>
        <tr><td style="padding:24px 32px 4px;">
          <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:1.5px;color:#9a978d;">Datos de contacto</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:12px 0;border-bottom:1px solid #ece9e2;"><p style="margin:0;font-size:13px;color:#9a978d;">Nombre</p><p style="margin:3px 0 0;font-size:16px;color:#1b1b17;">${d.name}</p></td></tr>
            <tr><td style="padding:12px 0;border-bottom:1px solid #ece9e2;"><p style="margin:0;font-size:13px;color:#9a978d;">Correo</p><p style="margin:3px 0 0;font-size:16px;"><a href="mailto:${d.email}" style="color:#2f5d3a;text-decoration:none;">${d.email}</a></p></td></tr>
            <tr><td style="padding:12px 0;"><p style="margin:0;font-size:13px;color:#9a978d;">Teléfono</p><p style="margin:3px 0 0;font-size:16px;"><a href="tel:${d.phone}" style="color:#2f5d3a;text-decoration:none;">${d.phone}</a></p></td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:24px 32px 8px;">
          <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:1.5px;color:#9a978d;">Detalle del proyecto</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="background-color:#f7f5f0;border-left:3px solid #2f5d3a;border-radius:6px;padding:16px 18px;"><p style="margin:0;font-size:16px;line-height:1.55;color:#1b1b17;">${d.message}</p></td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:24px 32px 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="padding-right:10px;"><a href="mailto:${d.email}" style="display:inline-block;background-color:#1e1e1b;color:#f3f1ec;text-decoration:none;font-size:14px;font-weight:600;padding:12px 26px;border-radius:999px;">Responder por correo</a></td>
            <td><a href="tel:${d.phone}" style="display:inline-block;background-color:#ffffff;color:#1b1b17;text-decoration:none;font-size:14px;font-weight:600;padding:11px 25px;border:1px solid #d8d5cc;border-radius:999px;">Llamar</a></td>
          </tr></table>
        </td></tr>
        <tr><td style="background-color:#f3f1ec;padding:22px 32px;text-align:center;">
          <p style="margin:0;font-size:13px;font-weight:600;color:#4a4a44;">Estructuras Asfálticas OLIVO S.A. de C.V.</p>
          <p style="margin:6px 0 0;font-size:12px;color:#9a978d;">Mensaje enviado desde el formulario de contacto de constructoraolivo.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
