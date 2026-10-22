/**
 * EmailJS Configuration
 * ─────────────────────────────────────────────────────────────────
 * WHY THIS FILE EXISTS:
 *   The Contact form uses EmailJS to send emails directly from the
 *   browser — no backend server required. This file centralises
 *   the three credentials so you only ever change them in one place.
 *
 * HOW TO FILL THIS IN:
 *   1. Create a free account at https://www.emailjs.com/
 *   2. Go to "Email Services" → Add Service (Gmail / Outlook / etc.)
 *      → copy the Service ID shown after creation.
 *   3. Go to "Email Templates" → Create Template.
 *      Use these variables in the template body:
 *        {{from_name}}   — sender's name
 *        {{from_email}}  — sender's email
 *        {{subject}}     — message subject
 *        {{message}}     — message body
 *      Copy the Template ID.
 *   4. Go to Account → API Keys → copy your Public Key.
 *   5. Paste all three values below and save.
 * ─────────────────────────────────────────────────────────────────
 */
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'YOUR_SERVICE_ID',    // e.g. 'service_abc123'
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',  // e.g. 'template_xyz789'
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY',    // e.g. 'aBcDeFgHiJkLmNoPqRsT'
};
