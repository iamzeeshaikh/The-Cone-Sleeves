import nodemailer from 'nodemailer';

/**
 * SMTP transport. Credentials come from the environment only — never from
 * source. See .env.example for the variable names.
 */
let cached: nodemailer.Transporter | null = null;

/**
 * Reads a variable from the runtime environment. `import.meta.env` covers the
 * dev server (which loads .env); `process.env` covers the deployed function,
 * where the host injects real values at runtime.
 */
function read(name: string): string | undefined {
  const fromVite = (import.meta.env as Record<string, string | undefined>)[name];
  return fromVite ?? process.env[name];
}

function env(name: string, fallback?: string): string {
  const v = read(name) ?? fallback;
  if (v === undefined) throw new Error(`Missing environment variable ${name}`);
  return v;
}

export function transport() {
  if (cached) return cached;
  const port = Number(env('SMTP_PORT', '465'));
  cached = nodemailer.createTransport({
    host: env('SMTP_HOST'),
    port,
    secure: port === 465,
    auth: { user: env('SMTP_USER'), pass: env('SMTP_PASS') },
  });
  return cached;
}

/**
 * Envelope sender. Note this is deliberately allowed to differ from SMTP_USER:
 * mail is relayed through one account but presented as support@conesleeves.com.
 */
export const MAIL_FROM = () =>
  `"${read('SMTP_FROM_NAME') || 'The Cone Sleeves'}" <${env('SMTP_FROM_EMAIL')}>`;

/**
 * Resolves who a form's notification goes to, most specific first:
 *   1. a per-form override (FORM_TO_DEFAULT / FORM_TO_POPUP / FORM_TO_QUOTE)
 *   2. SMTP_TO — the single address every form uses today
 *   3. the recipients recovered from the WordPress form config, as a last resort
 */
export function recipients(name: string, fallback: string): string[] {
  return (read(name) || read('SMTP_TO') || fallback)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string
  );

/** Renders label/value pairs the way the WordPress notifications did. */
export function renderTable(rows: Array<[string, string]>): string {
  const body = rows
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
    .map(
      ([k, v]) =>
        `<tr><th style="text-align:left;padding:6px 12px 6px 0;vertical-align:top;font-family:Arial,sans-serif;font-size:14px;color:#555">${escapeHtml(
          k
        )}</th><td style="padding:6px 0;font-family:Arial,sans-serif;font-size:14px;color:#111">${escapeHtml(
          String(v)
        ).replace(/\n/g, '<br>')}</td></tr>`
    )
    .join('');
  return `<table style="border-collapse:collapse">${body}</table>`;
}

export function renderText(rows: Array<[string, string]>): string {
  return rows
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
}

export const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
