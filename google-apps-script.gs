/**
 * Optional automatic-submission backend for SQUARE ARCHITECTS.
 *
 * Deploy this file separately at script.google.com as a Web app:
 *   Execute as: Me
 *   Who has access: Anyone
 *
 * If you use this endpoint, replace the mailto submit handler in script.js
 * with a fetch() POST to your deployed /exec URL. Never put a Gmail password
 * or private credential in the website.
 */
const CONSULTATION_RECIPIENT = "patelharsha680@gmail.com";

function doPost(event) {
  try {
    const payload = JSON.parse(event.postData.contents);
    const required = ["name", "number", "email", "description"];
    if (required.some((key) => !payload[key] || String(payload[key]).trim() === "")) {
      return jsonResponse({ ok: false, error: "All fields are required." });
    }
    const email = String(payload.email).trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ ok: false, error: "Please provide a valid email address." });
    }
    const subject = "New Consultation Request - SQUARE ARCHITECTS";
    const body = [
      `Name: ${String(payload.name).trim()}`,
      `Number: ${String(payload.number).trim()}`,
      `Email: ${email}`,
      `Description: ${String(payload.description).trim()}`
    ].join("\n");
    MailApp.sendEmail(CONSULTATION_RECIPIENT, subject, body, { replyTo: email });
    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, error: "Unable to process the consultation request." });
  }
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}